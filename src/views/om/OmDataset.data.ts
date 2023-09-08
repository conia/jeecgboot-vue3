import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '数据集名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '数据集格式',
    align:"center",
    dataIndex: 'dsFormat_dictText'
   },
   {
    title: '描述',
    align:"center",
    dataIndex: 'description'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "数据集名称",
      field: "name",
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '数据集名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入数据集名称!'},
          ];
     },
  },
  {
    label: '数据集格式',
    field: 'dsFormat',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"dataset_format"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入数据集格式!'},
          ];
     },
  },
  {
    label: '描述',
    field: 'description',
    component: 'InputTextArea',
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
export const omFileColumns: JVxeColumn[] = [
    {
      title: '文件',
      key: 'filePath',
      type: JVxeTypes.file,
      token:true,
      responseName:"message",
      number: 1,
      width:"200px",
      placeholder: '请选择文件',
      defaultValue:'',
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
    },
    {
      title: '文件大小',
      key: 'fileSize',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '文件类型',
      key: 'fileExt',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '描述',
      key: 'description',
      type: JVxeTypes.textarea,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
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