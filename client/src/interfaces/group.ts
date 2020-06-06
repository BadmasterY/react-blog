import { FormInstance } from "antd/lib/form";

interface AddGroupProps {
    modalVisible: boolean;
    onClick: (form: FormInstance, onEnd?: () => void) => void;
    onCancel: () => void;
}

export type AddProps = AddGroupProps;