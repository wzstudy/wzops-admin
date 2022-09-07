/**
 * -*- coding: utf-8 -*-
 * time: 2022/5/26 23:54
 * author: 臧成龙
 * QQ: 939589097
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('common.demo.nameText'),
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('common.demo.codeText'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('common.sortText'),
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: t('common.statusText'),
    dataIndex: 'status',
    width: 100,
  },
  {
    title: t('common.createDateText'),
    dataIndex: 'create_datetime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('common.demo.nameText'),
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('common.demo.nameText'),
    required: true,
    component: 'Input',
  },
  {
    field: 'code',
    label: t('common.demo.codeText'),
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    component: 'DictSelect',
    label: t('common.statusText'),
    componentProps: {
      dictCode: 'project_status',
    },
  },
  {
    field: 'sort',
    label: t('common.statusSort'),
    component: 'InputNumber',
    required: true,
  },
];
