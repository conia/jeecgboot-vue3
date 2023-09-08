<template>
    <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
        <BasicForm @register="registerForm" />
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { getInfoByTaskType } from '../OmTask.data';
import { saveOrUpdate } from '../OmTask.api';
// Emits声明
const emit = defineEmits(['register', 'success']);

// Task type: 1 for train 2 for deploy
const props = defineProps({
    taskType: {
        type: Number,
        required: true
    }
})

const [curSchema, curTitle, curTaskName] = getInfoByTaskType(props.taskType)

const isUpdate = ref(true);
//表单配置
const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
    schemas: curSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 }
});
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;

    // if (unref(isUpdate)) {
    //表单赋值
    await setFieldsValue({
        "modelId": data.record.id,
        "modelName": data.record.modelName,
        "name": curTaskName,
    });
    // }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter })
});
//设置标题
const title = computed(() => (!unref(isUpdate) ? curTitle : '编辑'));
//表单提交事件
async function handleSubmit(v) {
    try {
        let values = await validate();
        setModalProps({ confirmLoading: true });
        //提交表单
        await saveOrUpdate(values, isUpdate.value);
        //关闭弹窗
        closeModal();
        //刷新列表
        emit('success');
    } finally {
        setModalProps({ confirmLoading: false });
    }
}
</script>

<style lang="less" scoped>
/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
    width: 100%
}

:deep(.ant-calendar-picker) {
    width: 100%
}
</style>