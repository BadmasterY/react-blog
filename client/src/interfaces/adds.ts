import { FormInstance } from "antd/lib/form";

interface AddBasicProps {
    modalVisible: boolean;
    onClick: (form: FormInstance, onEnd?: () => void, onError?: () => void) => void;
    onCancel: () => void;
}

interface AddUserProps extends AddBasicProps {
    initpass: string;
}

interface AddUserFormResult {
    name: string;
    pass: string;
    position: string;
}

export type AddProps = AddBasicProps;
export type AddUserProp = AddUserProps;
export type AddUserForm = AddUserFormResult;