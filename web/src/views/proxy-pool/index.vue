<template>
  <div class="proxy-pool-container">
    <div class="header">
      <h2>代理IP池管理</h2>
      <a-button type="primary" @click="handleAdd">
        <template #icon>
          <PlusOutlined />
        </template>
        添加IP
      </a-button>
    </div>

    <a-card class="search-card">
      <a-form layout="inline" :model="searchForm" @finish="handleSearch">
        <a-form-item label="IP地址">
          <a-input
            v-model:value="searchForm.ip_address"
            placeholder="请输入IP地址"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item label="地理位置">
          <a-input
            v-model:value="searchForm.location"
            placeholder="请输入地理位置"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="searchForm.is_active"
            placeholder="请选择状态"
            style="width: 150px"
          >
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="true">可用</a-select-option>
            <a-select-option value="false">不可用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            <template #icon>
              <SearchOutlined />
            </template>
            查询
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="handleReset">
            <template #icon>
              <ReloadOutlined />
            </template>
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card class="table-card">
      <div class="table-header">
        <a-button
          type="default"
          @click="handleBatchValidate"
          :disabled="selectedRowKeys.length === 0"
        >
          <template #icon>
            <CheckCircleOutlined />
          </template>
          批量验证
        </a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :row-key="(record) => record.id"
        :row-selection="{ selectedRowKeys, onChange: handleRowSelectionChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.is_active ? 'green' : 'red'">
              {{ record.is_active ? '可用' : '不可用' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button
              type="link"
              size="small"
              @click="handleEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              type="link"
              size="small"
              danger
              @click="handleDelete(record.id)"
            >
              删除
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 添加/编辑弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        layout="vertical"
      >
        <a-form-item label="IP地址" name="ip_address">
          <a-input
            v-model:value="formData.ip_address"
            placeholder="请输入IP地址"
            disabled="modalType === 'edit'"
          />
        </a-form-item>
        <a-form-item label="端口" name="port">
          <a-input-number
            v-model:value="formData.port"
            :min="1"
            :max="65535"
            placeholder="请输入端口"
          />
        </a-form-item>
        <a-form-item label="协议类型" name="protocol">
          <a-select
            v-model:value="formData.protocol"
            placeholder="请选择协议类型"
          >
            <a-select-option value="HTTP">HTTP</a-select-option>
            <a-select-option value="HTTPS">HTTPS</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="地理位置" name="location">
          <a-input
            v-model:value="formData.location"
            placeholder="请输入地理位置"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined, SearchOutlined, ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';
import {
  getProxyIPList,
  createProxyIP,
  updateProxyIP,
  deleteProxyIP,
  validateProxyIPs,
  ProxyIP,
  ProxyIPFormParams,
} from './api';

const formRef = ref();
const modalVisible = ref(false);
const modalType = ref<'add' | 'edit'>('add');
const modalTitle = ref('添加代理IP');
const selectedRowKeys = ref<string[]>([]);

const searchForm = reactive({
  ip_address: '',
  location: '',
  is_active: '',
});

const formData = reactive<ProxyIPFormParams>({
  ip_address: '',
  port: 80,
  protocol: 'HTTP',
  location: '',
});

const formRules = {
  ip_address: [
    { required: true, message: '请输入IP地址', trigger: 'blur' },
    { pattern: /^\d{1,3}(\.\d{1,3}){3}$/, message: '请输入正确的IP地址格式', trigger: 'blur' },
  ],
  port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
  protocol: [{ required: true, message: '请选择协议类型', trigger: 'change' }],
};

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: true,
  showTotal: (total) => `共 ${total} 条记录`,
});

const tableData = ref<ProxyIP[]>([]);

const columns = [
  {
    title: 'IP地址',
    dataIndex: 'ip_address',
    key: 'ip_address',
    width: 150,
  },
  {
    title: '端口',
    dataIndex: 'port',
    key: 'port',
    width: 100,
  },
  {
    title: '协议',
    dataIndex: 'protocol',
    key: 'protocol',
    width: 100,
  },
  {
    title: '地理位置',
    dataIndex: 'location',
    key: 'location',
    width: 200,
  },
  {
    title: '延迟(ms)',
    dataIndex: 'latency',
    key: 'latency',
    width: 120,
  },
  {
    title: '最后验证时间',
    dataIndex: 'last_verified',
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
    width: 150,
  },
];

const loadData = async () => {
  try {
    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      ip_address: searchForm.ip_address,
      location: searchForm.location,
      is_active: searchForm.is_active ? JSON.parse(searchForm.is_active) : undefined,
    };

    const response = await getProxyIPList(params);
    tableData.value = response.items;
    pagination.total = response.total;
  } catch (error) {
    message.error('获取数据失败');
  }
};

const handleSearch = () => {
  pagination.current = 1;
  loadData();
};

const handleReset = () => {
  searchForm.ip_address = '';
  searchForm.location = '';
  searchForm.is_active = '';
  pagination.current = 1;
  loadData();
};

const handleAdd = () => {
  modalType.value = 'add';
  modalTitle.value = '添加代理IP';
  formData.ip_address = '';
  formData.port = 80;
  formData.protocol = 'HTTP';
  formData.location = '';
  modalVisible.value = true;
};

const handleEdit = (record: ProxyIP) => {
  modalType.value = 'edit';
  modalTitle.value = '编辑代理IP';
  formData.ip_address = record.ip_address;
  formData.port = record.port;
  formData.protocol = record.protocol;
  formData.location = record.location;
  modalVisible.value = true;
};

const handleModalOk = async () => {
  if (!formRef.value) return;
  await formRef.value.validate();

  try {
    if (modalType.value === 'add') {
      await createProxyIP(formData);
      message.success('添加成功');
    } else {
      // 需要获取当前编辑的IP的ID
      // 这里需要根据IP地址查询ID，因为IP地址是唯一的
      const response = await getProxyIPList({ page: 1, size: 1, ip_address: formData.ip_address });
      if (response.items.length > 0) {
        await updateProxyIP(response.items[0].id, formData);
        message.success('编辑成功');
      }
    }
    modalVisible.value = false;
    loadData();
  } catch (error) {
    message.error('操作失败');
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

const handleDelete = async (id: string) => {
  try {
    await deleteProxyIP(id);
    message.success('删除成功');
    loadData();
  } catch (error) {
    message.error('删除失败');
  }
};

const handleRowSelectionChange = (keys: string[]) => {
  selectedRowKeys.value = keys;
};

const handleBatchValidate = async () => {
  try {
    await validateProxyIPs(selectedRowKeys.value);
    message.success('批量验证任务已启动');
  } catch (error) {
    message.error('批量验证失败');
  }
};

const handleTableChange = (pagination: any) => {
  Object.assign(pagination, pagination);
  loadData();
};

// 初始化加载数据
loadData();
</script>

<style scoped>
.proxy-pool-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.table-card {
  margin-bottom: 20px;
}

.table-header {
  margin-bottom: 16px;
}
</style>