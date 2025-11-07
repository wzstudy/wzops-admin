<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Space style="height: 40px">
          <a-button
            type="primary"
            preIcon="ant-design:plus-outlined"
            @click="handleCreate"
          >
            添加IP
          </a-button>
          <a-button
            type="default"
            preIcon="ant-design:check-circle-outlined"
            @click="handleBatchValidate"
            :disabled="selectedRowKeys?.value?.length === 0"
          >
            批量验证
          </a-button>
        </Space>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
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
                  title: '确定要删除这条记录吗？',
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ProxyPoolDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import ProxyPoolDrawer from './drawer.vue';
  import { Space } from 'ant-design-vue';
  import { getProxyIPList, deleteProxyIP, validateProxyIPs } from './api';
  import { columns, searchFormSchema } from './data';
  import { message } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'ProxyPool',
    components: { BasicTable, ProxyPoolDrawer, TableAction, Space },
    setup() {
      const { t } = useI18n();

      const [registerDrawer, { openDrawer }] = useDrawer();
      const { createConfirm } = useMessage();
      const selectedRowKeys = ref<string[]>([]);

      const [registerTable, { reload, getSelectRows, setSelectedRowKeys }] = useTable({
        api: getProxyIPList,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
        },
        rowKey: (record) => record.id,
        pagination: {
          pageSize: 20,
        },
        rowSelection: {
          onChange: (keys) => {
            selectedRowKeys.value = keys;
          },
        },
      });

      function handleCreate() {
        openDrawer({
          isUpdate: false,
        });
      }

      function handleEdit(record) {
        openDrawer({
          isUpdate: true,
          record,
        });
      }

      function handleDelete(id) {
        return new Promise((resolve, reject) => {
          deleteProxyIP(id)
            .then(() => {
              message.success('删除成功');
              reload();
              resolve(true);
            })
            .catch((error) => {
              message.error('删除失败');
              reject(error);
            });
        });
      }

      function handleBulkDelete() {
        const rows = getSelectRows();
        const ids = rows.map((row) => row.id);
        createConfirm({
          title: '确定要删除选中的记录吗？',
          content: `共${ids.length}条记录`,
          onOk: () => {
            return new Promise((resolve, reject) => {
              // 这里需要实现批量删除API
              message.info('批量删除功能待实现');
              resolve(true);
            });
          },
        });
      }

      function handleBatchValidate() {
        const rows = getSelectRows();
        const ids = rows.map((row) => row.id);
        createConfirm({
          title: '确定要验证选中的IP吗？',
          content: `共${ids.length}条记录`,
          onOk: () => {
            return new Promise((resolve, reject) => {
              validateProxyIPs(ids)
                .then(() => {
                  message.success('验证任务已提交');
                  reload();
                  resolve(true);
                })
                .catch((error) => {
                  message.error('验证失败');
                  reject(error);
                });
            });
          },
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleBulkDelete,
        handleBatchValidate,
        handleSuccess,
        selectedRowKeys,
      };
    },
  });
</script>