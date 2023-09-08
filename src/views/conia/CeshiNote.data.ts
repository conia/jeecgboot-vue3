import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '用户名',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '性别',
    align:"center",
    dataIndex: 'sex_dictText'
   },
   {
    title: '年龄',
    align:"center",
    dataIndex: 'age'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
   {
    title: '生日',
    align:"center",
    dataIndex: 'birthday',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '下单时间',
    align:"center",
    dataIndex: 'xiaTime'
   },
   {
    title: '薪资',
    align:"center",
    dataIndex: 'salary'
   },
   {
    title: '大文本',
    align:"center",
    dataIndex: 'logTxt'
   },
   {
    title: '弹出报表',
    align:"center",
    dataIndex: 'popCc'
   },
   {
    title: '用户',
    align:"center",
    dataIndex: 'userId_dictText'
   },
   {
    title: '部门',
    align:"center",
    dataIndex: 'depId_dictText'
   },
   {
    title: '开关',
    align:"center",
    dataIndex: 'kaiGuan',
    customRender:({text}) => {
       return  render.renderSwitch(text, [{text:'是',value:'Y'},{text:'否',value:'N'}])
     },
   },
   {
    title: '文件',
    align:"center",
    dataIndex: 'file2',
    slots: { customRender: 'fileSlot' },
   },
   {
    title: '图片',
    align:"center",
    dataIndex: 'pic',
    customRender:render.renderImage,
   },
   {
    title: '省市区',
    align:"center",
    dataIndex: 'shengshiqu',
    slots: { customRender: 'pcaSlot' },
   },
   {
    title: '富文本',
    align:"center",
    dataIndex: 'accc',
    slots: { customRender: 'htmlSlot' },
   },
   {
    title: '物料分类',
    align:"center",
    dataIndex: 'daaType',
    customRender:({text}) => {
       return  render.renderCategoryTree(text,'')
   },
   },
   {
    title: '单选框',
    align:"center",
    dataIndex: 'ccc_dictText'
   },
   {
    title: 'aa',
    align:"center",
    dataIndex: 'aaa'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "用户名",
      field: 'name',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "生日",
      field: 'birthday',
      component: 'DatePicker',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '用户名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"sex"
     },
  },
  {
    label: '年龄',
    field: 'age',
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'DatePicker',
  },
  {
    label: '下单时间',
    field: 'xiaTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '薪资',
    field: 'salary',
    component: 'InputNumber',
  },
  {
    label: '大文本',
    field: 'logTxt',
    component: 'JMarkdownEditor',//注意string转换问题
  },
  {
    label: '弹出报表',
    field: 'popCc',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
        const {setFieldsValue} = formActionType;
        return{
            setFieldsValue:setFieldsValue,
            code:"demo",
            fieldConfig: [
                { source: 'name', target: 'popCc' },
            ],
            multi:true
        }
    },

  },
  {
    label: '用户',
    field: 'userId',
    component: 'JSelectUserByDept',
    componentProps:{
        labelKey:'realname',
     },
  },
  {
    label: '部门',
    field: 'depId',
     component: 'JSelectDept',
  },
  {
    label: '开关',
    field: 'kaiGuan',
     component: 'JSwitch',
     componentProps:{
     },
  },
  {
    label: '文件',
    field: 'file2',
    component: 'JUpload',
    componentProps:{
     },
  },
  {
    label: '图片',
    field: 'pic',
     component: 'JImageUpload',
     componentProps:{
      },
  },
  {
    label: '省市区',
    field: 'shengshiqu',
    component: 'JAreaLinkage',
  },
  {
    label: '富文本',
    field: 'accc',
    component: 'JEditor',
  },
  {
    label: '物料分类',
    field: 'daaType',
    component: 'JCategorySelect',
    componentProps:{
       pcode:"", //TODO back和事件未添加，暂时有问题
    },
  },
  {
    label: '单选框',
    field: 'ccc',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"sex"
     },
  },
  {
    label: 'aa',
    field: 'aaa',
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