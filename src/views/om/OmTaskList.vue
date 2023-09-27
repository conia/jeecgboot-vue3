<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
          <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{ text }">
        {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small"
          @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <OmTaskModal @register="registerModal" @success="handleSuccess"></OmTaskModal>
    <OmLogModal @register="registerLogModal"  :frameSrc="iframeUrl"></OmLogModal>

  </div>
</template>

<script lang="ts" name="om-omTask" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import OmTaskModal from './components/OmTaskModal.vue'
import OmLogModal from './components/OmLogModal.vue'
import { columns, searchFormSchema } from './OmTask.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './OmTask.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useGlobSetting } from '/@/hooks/setting';
import { Base64 } from 'js-base64';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
const checkedKeys = ref<Array<string | number>>([]);
const glob = useGlobSetting();
//注册model
const [registerModal, { openModal }] = useModal();
//注册log model
const [registerLogModal, { openModal: openLogModal }] = useModal();
const iframeUrl = ref('');
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '模型训练记录',
    api: list,
    columns,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [
      ],
      fieldMapToTime: [
      ],
    },
    actionColumn: {
      width: 120,
      fixed: 'right'
    },
  },
  exportConfig: {
    name: "模型训练记录",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
    showFooter: true,
  });
}
/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
}
/**
 * 详情
*/
function handleDetail(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: false,
  });
}
/**
 * 日志
*/
function handleLog(record: Recordable) {

  // console.log(record)


  if (!record.dirName) {
    createMessage.warn("日志不存在");
    return;

  }
  let logFile = "";
  const dirName = record.dirName;
  // console.log(dirName)
  switch (record.taskType) {
    case "1":
      // train
      logFile = `his/train/${dirName}/log/ft-${dirName}.log`;
      break;
    case "2":
      logFile = `his/eval/${dirName}/log/eval-${dirName}.log`;
      break;
    case "3":
      logFile = `his/deploy/${dirName}/log/deploy-${dirName}.log`;
      break;
    default:
      break;
  }

  if (logFile) {
    let logFileUrl = `http://localhost:8013/${logFile}`;
    
    // console.log(logFileUrl);
    let filePath = encodeURIComponent(Base64.encode(logFileUrl));
    let url = `${glob.viewUrl}?url=` + filePath;
    iframeUrl.value = url;
    // console.log(url);
    openLogModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  } else {
    createMessage.error("日志不存在");
    return;
  }

}
/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteOne({ id: record.id }, handleSuccess);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
}
/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    }
  ]
}
/**
   * 下拉操作栏
   */
function getDropDownAction(record) {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    }, {
      label: '日志',
      onClick: handleLog.bind(null, record),
    }, {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      }
    }
  ]
}


</script>

<style scoped></style>