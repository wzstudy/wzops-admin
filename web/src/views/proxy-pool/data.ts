/**
 * -*- coding: utf-8 -*-
 * time: 2024/05/20
 * author: system
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: 'IP地址',
    dataIndex: 'ip_address',
    width: 150,
  },
  {
    title: '端口',
    dataIndex: 'port',
    width: 100,
  },
  {
    title: '协议',
    dataIndex: 'protocol',
    width: 100,
  },
  {
    title: '地理位置',
    dataIndex: 'location',
    width: 150,
  },
  {
    title: '延迟',
    dataIndex: 'latency',
    width: 100,
    customRender: ({ record }) => {
      return `${record.latency}ms`;
    },
  },
  {
    title: '最后验证',
    dataIndex: 'last_verified',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'is_active',
    width: 100,
    customRender: ({ record }) => {
      return record.is_active ? '可用' : '不可用';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ip_address',
    label: 'IP地址',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'location',
    label: '地理位置',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'is_active',
    label: '状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { value: '', label: '全部' },
        { value: true, label: '可用' },
        { value: false, label: '不可用' },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'ip_address',
    label: 'IP地址',
    required: true,
    component: 'Input',
    rules: [
      { required: true, message: '请输入IP地址', trigger: 'blur' },
      { pattern: /^\d{1,3}(\.\d{1,3}){3}$/, message: '请输入正确的IP地址格式', trigger: 'blur' },
    ],
  },
  {
    field: 'port',
    label: '端口',
    required: true,
    component: 'InputNumber',
    componentProps: {
      min: 1,
      max: 65535,
    },
  },
  {
    field: 'protocol',
    label: '协议类型',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { value: 'HTTP', label: 'HTTP' },
        { value: 'HTTPS', label: 'HTTPS' },
      ],
    },
  },
  {
    field: 'location',
    label: '地理位置',
    component: 'Input',
  },
];