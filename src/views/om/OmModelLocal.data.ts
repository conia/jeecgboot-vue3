import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '名称',
    align:"center",
    dataIndex: 'modelName'
   },
   {
    title: '本地路径',
    align:"center",
    dataIndex: 'modelPath'
   },
   {
    title: '类型',
    align:"center",
    dataIndex: 'modelType_dictText'
   },
   {
    title: '参数大小',
    align:"center",
    dataIndex: 'paramSize'
   },
   {
    title: '上下文长度',
    align:"center",
    dataIndex: 'tokenSize'
   },
   {
    title: '模型大小',
    align:"center",
    dataIndex: 'totalSize'
   },
   {
    title: '父模型',
    align:"center",
    dataIndex: 'baseModeId'
   },
   {
    title: '训练状态',
    align:"center",
    dataIndex: 'modelTrainStatus_dictText'
   },
   {
    title: '发布状态',
    align:"center",
    dataIndex: 'modelStatus_dictText'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "名称",
      field: 'modelName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "类型",
      field: 'modelType',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_type"
      },
      colProps: {span: 6},
 	},
	{
      label: "训练状态",
      field: 'modelTrainStatus',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_train_status"
      },
      colProps: {span: 6},
 	},
	{
      label: "发布状态",
      field: 'modelStatus',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_deploy_status"
      },
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'modelName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入名称!'},
          ];
     },
  },
  {
    label: '本地路径',
    field: 'modelPath',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本地路径!'},
          ];
     },
  },
  {
    label: '类型',
    field: 'modelType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"model_type"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入类型!'},
          ];
     },
  },
  {
    label: '参数大小',
    field: 'paramSize',
    component: 'Input',
  },
  {
    label: '上下文长度',
    field: 'tokenSize',
    component: 'Input',
  },
  {
    label: '模型大小',
    field: 'totalSize',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}