import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
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
    title: '模型来源',
    align:"center",
    dataIndex: 'modelSrc_dictText'
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
    dataIndex: 'baseModeId_dictText'
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
      field: "modelName",
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "模型来源",
      field: "modelSrc",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_src_type"
      },
      colProps: {span: 6},
 	},
	{
      label: "类型",
      field: "modelType",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_type"
      },
      colProps: {span: 6},
 	},
	{
      label: "父模型",
      field: "baseModeId",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"om_model where model_train_status = 3 ,model_name,id"
      },
      colProps: {span: 6},
 	},
	{
      label: "训练状态",
      field: "modelTrainStatus",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_train_status"
      },
      colProps: {span: 6},
 	},
	{
      label: "发布状态",
      field: "modelStatus",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"model_deploy_status"
      },
      colProps: {span: 6},
 	},
];

export function getFormSchema(isUpdate:boolean) {
  if(!isUpdate){
    return formSchemaAdd;
  }else{
    return formSchema;
  }
}

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
    label: '基础模型',
    field: 'baseModeId',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"om_model m left join om_task t on m.train_task_id = t.id  where t.status = 5 or m.model_src = 1,model_name,m.id"
     },
    dynamicRules: ({model,schema}) => {
      return [
             { required: true, message: '请选择基础模型!'},
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
                 { required: true, message: '请选择类型!'},
          ];
     },
  },  
  
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];


//子表单数据
//子表表格配置
export const omModelDataColumns: JVxeColumn[] = [
    {
      title: '数据文件',
      key: 'fileId',
      type: JVxeTypes.popup,
      popupCode:"report_om_data",
      fieldConfig: [
        
          { source: 'id', target: 'fileId' },
          { source: 'file_name', target: 'fileName' },
        
      ],

      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [
        { required: true, message: '${title}不能为空' },
      ],
      allowInput: false,
      
    },
    {
      title: '文件名',
      key: 'fileName',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [
        { required: true, message: '${title}不能为空' },
      ],
      disabled: true,
    },
  ]


/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
// 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema  
  return formSchema;
}