<template>
  <div class="app-container">
    <div class="search-box">
      <a-input
        v-model:value="searchForm.ip_address"
        placeholder="IP地址"
        style="width: 200px; margin-right: 10px;"
      />
      <a-input
        v-model:value="searchForm.location"
        placeholder="地理位置"
        style="width: 200px; margin-right: 10px;"
      />
      <a-select
        v-model:value="searchForm.is_active"
        placeholder="状态"
        style="width: 150px; margin-right: 10px;"
      >
        <a-select-option value>可用</a-select-option>
        <a-select-option :value="false">不可用</a-select-option>
      </a-select>
      <a-button type="primary" @click="handleSearch">搜索</a-button>
      <a-button @click="handleReset">重置</a-button>
    </div>

    <div class="table-box">
      <div class="table-toolbar">
        <a-button type="primary" @click="handleAdd">添加IP</a-button>
        <a-button @click="handleBatchValidate" :disabled="selectedRowKeys.length === 0">批量验证</a-button>
        <a-button danger @click="handleBatchDelete" :disabled="selectedRowKeys.length === 0">批量删除</a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :row-key="(record) => record.id"
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.is_active ? 'green' : 'red'">
              {{ record.is_active ? '可用' : '不可用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'latency'">
            {{ record.latency ? `${record.latency}ms` : '-' }}
          </template>
          <template v-if="column.key === 'last_verified'">
            {{ record.last_verified ? formatDate(record.last_verified) : '-' }}
          </template>
          <template v-if="column.key === 'protocol'">
            <a-tag :color="record.protocol === 'HTTPS' ? 'blue' : 'orange'">
              {{ record.protocol }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">
              编辑
            </a-button>
            <a-button type="link" danger @click="handleDelete(record)">
              删除
            </a-button>
            <a-button type="link" @click="handleValidate(record)">
              验证
            </a-button>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form :model="formData" :rules="formRules" ref="formRef">
        <a-form-item label="IP地址" name="ip_address">
          <a-input v-model:value="formData.ip_address" placeholder="请输入IP地址" />
        </a-form-item>
        <a-form-item label="端口" name="port">
          <a-input-number v-model:value="formData.port" :min="1" :max="65535" placeholder="请输入端口" />
        </a-form-item>
        <a-form-item label="类型" name="protocol">
          <a-select v-model:value="formData.protocol" placeholder="请选择协议类型">
            <a-select-option value="HTTP">HTTP</a-select-option>
            <a-select-option value="HTTPS">HTTPS</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="地理位置" name="location">
          <a-input v-model:value="formData.location" placeholder="请输入地理位置" />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea v-model:value="formData.remark" placeholder="请输入备注" :rows="3" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { format } from 'date-fns';
import { getList, createOrUpdate, deleteItem, validateBatch } from '/@/api/proxy-pool';

// 表格列配置
const columns = [
  {
    title: 'IP地址',
    dataIndex: 'ip_address',
    key: 'ip_address',
    width: 180,
  },
  {
    title: '端口',
    dataIndex: 'port',
    key: 'port',
    width: 100,
  },
  {
    title: '类型',
    key: 'protocol',
    width: 100,
  },
  {
    title: '地理位置',
    dataIndex: 'location',
    key: 'location',
    width: 150,
  },
  {
    title: '延迟',
    key: 'latency',
    width: 100,
  },
  {
    title: '最后验证时间',
    key: 'last_verified',
    width: 180,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
  },
];

// 表格数据
const tableData = ref([]);
// 加载状态
const loading = ref(false);
// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  onChange: (page: number, pageSize: number) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
    fetchData();
  },
});

// 搜索表单
const searchForm = reactive({
  ip_address: '',
  location: '',
  is_active: undefined,
});

// 选中行
const selectedRowKeys = ref<number[]>([]);
const onSelectChange = (newSelectedRowKeys: number[]) => {
  selectedRowKeys.value = newSelectedRowKeys;
};

// 弹窗配置
const modalVisible = ref(false);
const modalTitle = ref('添加IP');
const isEdit = ref(false);
const formRef = ref();
const formData = reactive({
  ip_address: '',
  port: null,
  protocol: 'HTTP',
  location: '',
  remark: '',
});

// 表单验证规则
const formRules = reactive({
  ip_address: [
    { required: true, message: '请输入IP地址', trigger: 'blur' },
    { type: 'string', pattern: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, message: '请输入有效的IP地址', trigger: 'blur' },
  ],
  port: [
    { required: true, message: '请输入端口', trigger: 'blur' },
    { type: 'number', min: 1, max: 65535, message: '端口范围1-65535', trigger: 'blur' },
  ],
  protocol: [{ required: true, message: '请选择协议类型', trigger: 'change' }],
});

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

// 获取表格数据
const fetchData = async () => {
  loading.value = true;
  try {
    const params = {
      ...searchForm,
      page: pagination.current,
      size: pagination.pageSize,
    };
    const response = await getList(params);
    tableData.value = response.data;
    pagination.total = response.total;
  } catch (error) {
    message.error('获取数据失败');
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  pagination.current = 1;
  fetchData();
};

// 重置
const handleReset = () => {
  searchForm.ip_address = '';
  searchForm.location = '';
  searchForm.is_active = undefined;
  pagination.current = 1;
  fetchData();
};

// 打开添加弹窗
const handleAdd = () => {
  modalTitle.value = '添加IP';
  isEdit.value = false;
  formData.ip_address = '';
  formData.port = null;
  formData.protocol = 'HTTP';
  formData.location = '';
  formData.remark = '';
  modalVisible.value = true;
};

// 打开编辑弹窗
const handleEdit = (record: any) => {
  modalTitle.value = '编辑IP';
  isEdit.value = true;
  formData.ip_address = record.ip_address;
  formData.port = record.port;
  formData.protocol = record.protocol;
  formData.location = record.location;
  formData.remark = record.remark;
  modalVisible.value = true;
};

// 保存表单
const handleModalOk = async () => {
  if (!formRef.value) return;
  await formRef.value.validate();
  try {
    const params = {
      ...formData,
      id: isEdit.value ? formData.id : undefined,
    };
    await createOrUpdate(params, isEdit.value);
    message.success(isEdit.value ? '更新成功' : '添加成功');
    modalVisible.value = false;
    fetchData();
  } catch (error) {
    message.error(isEdit.value ? '更新失败' : '添加失败');
  }
};

// 关闭弹窗
const handleModalCancel = () => {
  modalVisible.value = false;
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

// 删除
const handleDelete = async (record: any) => {
  try {
    await deleteItem(record.id);
    message.success('删除成功');
    fetchData();
  } catch (error) {
    message.error('删除失败');
  }
};

// 批量删除
const handleBatchDelete = async () => {
  if (selectedRowKeys.value.length === 0) return;
  try {
    for (const id of selectedRowKeys.value) {
      await deleteItem(id);
    }
    message.success('批量删除成功');
    selectedRowKeys.value = [];
    fetchData();
  } catch (error) {
    message.error('批量删除失败');
  }
};

// 验证
const handleValidate = async (record: any) => {
  try {
    await validateBatch([record.id]);
    message.success('验证任务已启动');
    // 可以添加实时状态更新逻辑
  } catch (error) {
    message.error('验证失败');
  }
};

// 批量验证
const handleBatchValidate = async () => {
  if (selectedRowKeys.value.length === 0) return;
  try {
    await validateBatch(selectedRowKeys.value);
    message.success('批量验证任务已启动');
    // 可以添加实时状态更新逻辑
  } catch (error) {
    message.error('批量验证失败');
  }
};

// 初始化
fetchData();
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.table-box {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.table-toolbar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>