import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getCurDT } from '/@/utils/dateUtil';

//列表数据
export const columns: BasicColumn[] = [


  {
    title: '任务名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '任务类型',
    align: "center",
    dataIndex: 'taskType_dictText'
  },
  {
    title: '模型',
    align: "center",
    dataIndex: 'modelId_dictText'
  },
  {
    title: '训练参数',
    align: "center",
    dataIndex: 'params'
  },
  {
    title: '环境变量',
    align: "center",
    dataIndex: 'envs'
  },
  {
    title: '开始时间',
    align: "center",
    dataIndex: 'startTime'
  },
  {
    title: '结束时间',
    align: "center",
    dataIndex: 'endTime'
  },

  {
    title: '任务状态',
    align: "center",
    dataIndex: 'status_dictText'
  },
  {
    title: '任务信息',
    align: "center",
    dataIndex: 'message'
  },
  {
    title: 'mlflow',
    align: "center",
    dataIndex: 'mlflow'
  },
  {
    title: 'wandb',
    align: "center",
    dataIndex: 'wandb'
  },
  {
    title: '部署端口',
    align: "center",
    dataIndex: 'port'
  },

];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "任务名称",
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: "任务状态",
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "model_run_status"
    },
    colProps: { span: 6 },
  },
  {
    label: "模型",
    field: 'modelId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "om_model,model_name,id"
    },
    colProps: { span: 6 },
  },
  {
    label: "任务类型",
    field: 'taskType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "model_task_type"
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchemaTrain: FormSchema[] = [

  {
    label: '模型',
    field: 'modelId',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
  },
  {
    label: '模型名称',
    field: 'modelName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '任务名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入任务名称!' },
      ];
    },
  },
  {
    label: '训练参数',
    field: 'params',
    component: 'InputTextArea',
  },
  {
    label: '环境变量',
    field: 'envs',
    component: 'InputTextArea',
  },
  {
    label: '任务类型',
    field: 'taskType',
    component: 'Input',
    show: false,
    defaultValue: "1",
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];


//表单数据
export const formSchemaEval: FormSchema[] = [

  {
    label: '模型',
    field: 'modelId',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
  },
  {
    label: '模型名称',
    field: 'modelName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '任务名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入任务名称!' },
      ];
    },
  },
  {
    label: '启动参数',
    field: 'params',
    component: 'InputTextArea',
  },
  {
    label: '环境变量',
    field: 'envs',
    component: 'InputTextArea',
  },
  {
    label: '任务类型',
    field: 'taskType',
    component: 'Input',
    show: false,
    defaultValue: "2",
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];



//表单数据
export const formSchemaDeploy: FormSchema[] = [

  {
    label: '模型',
    field: 'modelId',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
  },
  {
    label: '模型名称',
    field: 'modelName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '任务名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入任务名称!' },
      ];
    },
  },
  {
    label: '部署端口',
    field: 'port',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true },
        { pattern: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/, message: '请输入1024到65535之间的数字' }
      ];
    },
  },
  {
    label: '启动参数',
    field: 'params',
    component: 'InputTextArea',
  },
  {
    label: '环境变量',
    field: 'envs',
    component: 'InputTextArea',
  },
  {
    label: '任务类型',
    field: 'taskType',
    component: 'Input',
    show: false,
    defaultValue: "3",
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];

export function getInfoByTaskType(taskType: number) {
  if (taskType == 1) {
    return [formSchemaTrain, "训练模型 -- 创建模型训练任务", "train-" + getCurDT()]
  } else if (taskType == 2) {
    return [formSchemaEval, "评估模型 -- 将模型加入评估池", "eval-" + getCurDT()]
  } else {
    return [formSchemaDeploy, "部署模型 -- 创建模型发布任务", "deploy-" + getCurDT()]
  }
}


/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}