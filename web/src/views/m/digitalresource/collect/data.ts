
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
    
  {
    title: '输入框',
    dataIndex: 'input_1',
    width: '80',
    fixed: '',
    align: 'left',
    auth: ['ppingg:input_1'],
    resizable: true,
  },

  {
    title: '数字输入框',
    dataIndex: 'input_number_2',
    width: '80',
    fixed: '',
    align: 'left',
    auth: ['ppingg:input_number_2'],
    resizable: true,
  },

  {
    title: '复选框',
    dataIndex: '组',
    width: '80',
    fixed: '',
    align: 'left',
    auth: ['ppingg:组'],
    resizable: true,
  },

  {
    title: '文本域',
    dataIndex: 'input_text_area_4',
    width: '80',
    fixed: '',
    align: 'left',
    auth: ['ppingg:input_text_area_4'],
    resizable: true,
  },

]
export const searchFormSchema: FormSchema[] = [
        
  {
    label: '输入框',
    field: 'input_1',
    component: 'Input',
    colProps: { span: 6 },
  },

  {
    label: '数字输入框',
    field: 'input_number_2',
    component: 'Input',
    colProps: { span: 6 },
  },

  {
    label: '复选框',
    field: '组',
    component: 'Input',
    colProps: { span: 6 },
  },

  {
    label: '文本域',
    field: 'input_text_area_4',
    component: 'Input',
    colProps: { span: 6 },
  },

];
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false
  },
  {
    component: 'Input',
    label: '输入框',
    field: 'input_1',
    colProps: {
      span: 24
    },
    componentProps: {
      type: 'text'
    },
    itemProps: {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 5
      },
      required: true,
      hidden: false,
      colon: true,
      hasFeedback: true,
      autoLink: true,
      validateFirst: true
    }
  },
  {
    component: 'InputNumber',
    label: '数字输入框',
    field: 'input_number_2',
    colProps: {
      span: 24
    },
    componentProps: {
      style: 'width:200px'
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'CheckboxGroup',
    label: '复选框-组',
    field: 'checkbox_group_3',
    colProps: {
      span: 24
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {
        span: 6
      }
    }
  },
  {
    component: 'InputTextArea',
    label: '文本域',
    field: 'input_text_area_4',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 7
      },
      validateStatus: 'validating'
    }
  },
  {
    component: 'CheckboxGroup',
    label: '复选框-组',
    field: 'checkbox_group_1',
    colProps: {
      span: 24
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    },
    itemProps: {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 6
      },
      required: true,
      hidden: false,
      hiddenLabel: true,
      colon: true
    }
  },
  {
    component: 'StrengthMeter',
    label: '密码强度',
    colProps: {
      span: 24
    },
    field: 'strength_meter_2',
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Divider',
    label: '分割线',
    colProps: {
      span: 24
    },
    field: 'divider_3',
    componentProps: {
      orientation: 'center',
      dashed: true
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'RadioGroup',
    label: '单选框-组',
    field: 'radio_group_4',
    colProps: {
      span: 24
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Transfer',
    label: '穿梭框',
    field: 'transfer_16',
    colProps: {
      span: 24
    },
    componentProps: {
      dataSource: [
        {
          key: 'key-1',
          title: '标题1',
          description: '描述',
          disabled: false,
          chosen: true
        },
        {
          key: 'key-2',
          title: 'title2',
          description: 'description2',
          disabled: true
        },
        {
          key: 'key-3',
          title: '标题3',
          description: '描述3',
          disabled: false,
          chosen: true
        }
      ],
      pagination: false,
      showSelectAll: true,
      showSearch: false
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    },
    link: []
  },
  {
    component: 'slot',
    label: '插槽',
    field: 'lot_15',
    colProps: {
      span: 24
    },
    componentProps: {
      slotName: 'slotName'
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'DatePicker',
    label: '日期选择',
    field: 'date_picker_5',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'RangePicker',
    label: '日期范围',
    field: 'range_picker_6',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: [
        '开始日期',
        '结束日期'
      ]
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'MonthPicker',
    label: '月份选择',
    field: 'month_picker_7',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: '请选择月份'
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'TimePicker',
    label: '时间选择',
    field: 'time_picker_8',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Slider',
    label: '滑动输入条',
    field: 'slider_9',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Rate',
    label: '评分',
    field: 'rate_10',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Switch',
    label: '开关',
    field: 'switch_11',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Upload',
    label: '上传',
    field: 'upload_13',
    colProps: {
      span: 24
    },
    componentProps: {},
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'Cascader',
    label: '级联选择',
    field: 'cascader_14',
    colProps: {
      span: 24
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          children: [
            {
              label: '选项三',
              value: '1-1'
            }
          ]
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  },
  {
    component: 'TreeSelect',
    label: '树形选择',
    field: 'tree_select_12',
    colProps: {
      span: 24
    },
    componentProps: {
      treeData: [
        {
          label: '选项1',
          value: '1',
          children: [
            {
              label: '选项三',
              value: '1-1'
            }
          ]
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    },
    itemProps: {
      labelCol: {},
      wrapperCol: {}
    }
  }
]