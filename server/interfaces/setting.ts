interface GetSettingsRequest {
    id: string;
}

interface UpdateSettingRequest {
    id: string;
    isUseRegister: boolean;
    updateUserId?: string;
}

export {
    GetSettingsRequest,
    UpdateSettingRequest,
}