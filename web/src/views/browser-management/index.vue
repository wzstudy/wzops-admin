<template>
  <PageWrapper title="比特浏览器管理">
    <template #tableTitle>
      <Space style="height: 40px">
        <a-input-search
          placeholder="搜索窗口名称、备注信息或代理信息"
          allowClear
          enterButton
          size="middle"
          @search="handleSearch"
          class="w-1/2"
        />
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleAdd"
        >
          {{ t('common.addText') }}
        </a-button>
      </Space>
    </template>
    
    <BasicTable @register="registerTable">
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
        <TableAction
          :actions="[
            {
              type: 'button',
              icon: 'clarity:note-edit-line',
              color: 'primary',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              type: 'button',
              color: 'error',
              placement: 'left',
              popConfirm: {
                title: t('common.delHintText'),
                confirm: handleDelete.bind(null, record.id),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    
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
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { Space } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { TableProps } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';

// 导入API函数
import { getWindowList, createOrUpdateWindow, deleteWindow } from './api';

const { t } = useI18n();

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

// 表格配置
const [registerTable, { reload, getSelectRows }] = useTable({
  api: getWindowList,
  columns,
  pagination: {
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    showTotal: (total: number) => `共 ${total} 条记录`,
  },
});

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

// 搜索处理
const handleSearch = (value: string) => {
  console.log('搜索:', value);
  // 这里需要实现搜索功能，通常是调用API并传入搜索参数
  reload({
    search: value,
  });
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
const handleDelete = async (id: number) => {
  try {
    await deleteWindow(id);
    message.success('删除窗口成功');
    reload();
  } catch (error) {
    console.error('删除窗口失败:', error);
    message.error('删除窗口失败');
  }
};

// 模态框确认
const handleModalOk = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validateFields();
    
    await createOrUpdateWindow(
      {
        id: formData.id,
        name: formData.name,
        proxy_domain: formData.proxy_domain,
        remark: formData.remark,
      },
      !!formData.id
    );
    
    message.success(formData.id ? '更新窗口成功' : '添加窗口成功');
    modalVisible.value = false;
    reload();
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

// 模态框取消
const handleModalCancel = () => {
  modalVisible.value = false;
  formRef.value?.resetFields();
};

// 组件挂载时加载数据
onMounted(() => {
  // 表格数据会在useTable中自动加载
});
</script>

<style lang="less" scoped>
</style>