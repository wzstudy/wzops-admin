<template>
  <PageWrapper title="比特浏览器管理">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <div class="flex-1">
          <a-input-search
            placeholder="搜索窗口名称、备注信息或代理信息"
            allowClear
            enterButton
            size="middle"
            @search="handleSearch"
            class="w-1/2"
          />
        </div>
        <div class="ml-4">
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            添加窗口
          </a-button>
        </div>
      </div>
    </template>
    
    <a-table
      :columns="columns"
      :data-source="windowList"
      :pagination="pagination"
      row-key="id"
      bordered
      class="mt-4"
    >
      <template #status="{ record }">
        <a-tag :color="record.status === 'online' ? 'green' : 'red'">
          {{ record.status === 'online' ? '在线' : '离线' }}
        </a-tag>
      </template>
      <template #proxy="{ record }">
        <div>
          {{ record.proxy_domain }}
          <a-tag :color="record.proxy_status ? 'green' : 'red'" size="small" class="ml-2">
            {{ record.proxy_status ? '正常' : '异常' }}
          </a-tag>
        </div>
      </template>
      <template #action="{ record }">
        <div class="flex">
          <a-button type="link" @click="handleEdit(record)">
            编辑
          </a-button>
          <a-button type="link" danger @click="handleDelete(record)">
            删除
          </a-button>
        </div>
      </template>
    </a-table>
    
    <!-- 添加/编辑窗口模态框 -->
    <a-modal
      :title="modalTitle"
      :visible="modalVisible"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        layout="vertical"
      >
        <a-form-item
          name="name"
          label="窗口名称"
          :rules="[{ required: true, message: '请输入窗口名称', trigger: 'blur' }]"
        >
          <a-input placeholder="请输入窗口名称" />
        </a-form-item>
        <a-form-item
          name="proxy_domain"
          label="代理域名"
        >
          <a-input placeholder="请输入代理域名" />
        </a-form-item>
        <a-form-item
          name="last_ip"
          label="最后已知IP"
          disabled
        >
          <a-input placeholder="最后已知IP" />
        </a-form-item>
        <a-form-item
          name="status"
          label="状态"
          disabled
        >
          <a-select placeholder="请选择状态">
            <a-select-option value="online">在线</a-select-option>
            <a-select-option value="offline">离线</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          name="remark"
          label="备注信息"
        >
          <a-textarea placeholder="请输入备注信息" :rows="3" />
        </a-form-item>
      </a-form>
    </a-modal>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { PageWrapper } from '/@/components/Page';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { TableProps } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';

// 表格列配置
const columns: TableProps['columns'] = [
  { title: '窗口ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 180 },
  { title: '代理域名(代理状态)', dataIndex: ['proxy_domain', 'proxy_status'], key: 'proxy', scopedSlots: { customRender: 'proxy' }, width: 250 },
  { title: '最后已知IP', dataIndex: 'last_ip', key: 'last_ip', width: 150 },
  { title: '状态', dataIndex: 'status', key: 'status', scopedSlots: { customRender: 'status' }, width: 100 },
  { title: '备注信息', dataIndex: 'remark', key: 'remark' },
  { title: '操作', key: 'action', scopedSlots: { customRender: 'action' }, width: 120 },
];

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50'],
  showTotal: (total: number) => `共 ${total} 条记录`,
});

// 窗口列表数据
const windowList = ref<any[]>([]);

// 模态框状态
const modalVisible = ref(false);
const modalTitle = ref('添加窗口');
const formRef = ref<FormInstance>();

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  proxy_domain: '',
  last_ip: '',
  status: 'offline',
  remark: '',
});

// 表单验证规则
const formRules = reactive({
  name: [{ required: true, message: '请输入窗口名称', trigger: 'blur' }],
});

// 加载窗口列表
const loadWindowList = async () => {
  try {
    // 这里需要替换为实际的API调用
    const response = await fetch('/api/browser/windows', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    
    if (data.code === 0) {
      windowList.value = data.data;
      pagination.total = data.total;
    } else {
      message.error(data.message || '加载窗口列表失败');
    }
  } catch (error) {
    console.error('加载窗口列表失败:', error);
    message.error('加载窗口列表失败');
  }
};

// 搜索处理
const handleSearch = (value: string) => {
  console.log('搜索:', value);
  // 这里需要实现搜索功能，通常是调用API并传入搜索参数
  loadWindowList();
};

// 添加窗口
const handleAdd = () => {
  modalTitle.value = '添加窗口';
  formData.id = '';
  formData.name = '';
  formData.proxy_domain = '';
  formData.last_ip = '';
  formData.status = 'offline';
  formData.remark = '';
  modalVisible.value = true;
};

// 编辑窗口
const handleEdit = (record: any) => {
  modalTitle.value = '编辑窗口';
  formData.id = record.id;
  formData.name = record.name;
  formData.proxy_domain = record.proxy_domain;
  formData.last_ip = record.last_ip;
  formData.status = record.status;
  formData.remark = record.remark;
  modalVisible.value = true;
};

// 删除窗口
const handleDelete = (record: any) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除窗口 "${record.name}" 吗？`,
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      try {
        // 这里需要替换为实际的API调用
        const response = await fetch(`/api/browser/windows/${record.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        if (data.code === 0) {
          message.success('删除窗口成功');
          loadWindowList();
        } else {
          message.error(data.message || '删除窗口失败');
        }
      } catch (error) {
        console.error('删除窗口失败:', error);
        message.error('删除窗口失败');
      }
    },
  });
};

// 模态框确认
const handleModalOk = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validateFields();
    
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `/api/browser/windows/${formData.id}` : '/api/browser/windows';
    
    // 这里需要替换为实际的API调用
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        proxy_domain: formData.proxy_domain,
        remark: formData.remark,
      }),
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      message.success(formData.id ? '更新窗口成功' : '添加窗口成功');
      modalVisible.value = false;
      loadWindowList();
    } else {
      message.error(data.message || (formData.id ? '更新窗口失败' : '添加窗口失败'));
    }
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

// 模态框取消
const handleModalCancel = () => {
  modalVisible.value = false;
  formRef.value?.resetFields();
};

// 分页变化处理
const handlePaginationChange = (page: number, pageSize: number) => {
  pagination.current = page;
  pagination.pageSize = pageSize;
  loadWindowList();
};

// 组件挂载时加载数据
onMounted(() => {
  loadWindowList();
});
</script>

<style lang="less" scoped>
</style>