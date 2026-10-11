/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accounts_BalanceInputs */
/** @typedef {{}} Accounts_CloseInputs */
/** @typedef {{ count: NonNullable<unknown> }} Accounts_Close_CardsInputs */
/** @typedef {{}} Accounts_Close_ConfirmInputs */
/** @typedef {{}} Accounts_Close_TextInputs */
/** @typedef {{ label: NonNullable<unknown> }} Accounts_Closed_ToastInputs */
/** @typedef {{ count: NonNullable<unknown> }} Accounts_CountInputs */
/** @typedef {{}} Accounts_EmptyInputs */
/** @typedef {{}} Accounts_KindInputs */
/** @typedef {{}} Accounts_LabelInputs */
/** @typedef {{ max: NonNullable<unknown> }} Accounts_Label_HintInputs */
/** @typedef {{}} Accounts_Label_PlaceholderInputs */
/** @typedef {{ count: NonNullable<unknown>, max: NonNullable<unknown> }} Accounts_LimitInputs */
/** @typedef {{}} Accounts_MainInputs */
/** @typedef {{ label: NonNullable<unknown> }} Accounts_Main_ToastInputs */
/** @typedef {{}} Accounts_NumberInputs */
/** @typedef {{}} Accounts_OpenInputs */
/** @typedef {{}} Accounts_Open_ConfirmInputs */
/** @typedef {{}} Accounts_Open_TextInputs */
/** @typedef {{ label: NonNullable<unknown> }} Accounts_Opened_ToastInputs */
/** @typedef {{}} Accounts_PersonalInputs */
/** @typedef {{}} Accounts_RenameInputs */
/** @typedef {{}} Accounts_Rename_TextInputs */
/** @typedef {{}} Accounts_Renamed_ToastInputs */
/** @typedef {{}} Accounts_Section_MineInputs */
/** @typedef {{}} Accounts_Select_HintInputs */
/** @typedef {{}} Accounts_Select_TitleInputs */
/** @typedef {{}} Accounts_Set_MainInputs */
/** @typedef {{}} Accounts_State_ActiveInputs */
/** @typedef {{}} Accounts_State_FrozenInputs */
/** @typedef {{}} Accounts_TitleInputs */
/** @typedef {{}} Accounts_TransactionsInputs */
/** @typedef {{}} Beneficiaries_AddInputs */
/** @typedef {{}} Beneficiaries_Add_TextInputs */
/** @typedef {{ label: NonNullable<unknown> }} Beneficiaries_Added_ToastInputs */
/** @typedef {{}} Beneficiaries_EmptyInputs */
/** @typedef {{}} Beneficiaries_LabelInputs */
/** @typedef {{}} Beneficiaries_RemoveInputs */
/** @typedef {{ label: NonNullable<unknown> }} Beneficiaries_Removed_ToastInputs */
/** @typedef {{}} Beneficiaries_SendInputs */
/** @typedef {{}} Beneficiaries_TitleInputs */
/** @typedef {{}} Cards_BlockInputs */
/** @typedef {{}} Cards_Blocked_ToastInputs */
/** @typedef {{}} Cards_CancelInputs */
/** @typedef {{}} Cards_Cancel_ConfirmInputs */
/** @typedef {{}} Cards_Cancel_TextInputs */
/** @typedef {{}} Cards_Cancelled_ToastInputs */
/** @typedef {{}} Cards_Change_PinInputs */
/** @typedef {{ number: NonNullable<unknown> }} Cards_Change_Pin_TextInputs */
/** @typedef {{}} Cards_ExpiresInputs */
/** @typedef {{}} Cards_HolderInputs */
/** @typedef {{ count: NonNullable<unknown>, max: NonNullable<unknown> }} Cards_LimitInputs */
/** @typedef {{}} Cards_NoneInputs */
/** @typedef {{}} Cards_OrderInputs */
/** @typedef {{}} Cards_Order_ConfirmInputs */
/** @typedef {{}} Cards_Order_HintInputs */
/** @typedef {{}} Cards_Order_TextInputs */
/** @typedef {{}} Cards_Ordered_ToastInputs */
/** @typedef {{}} Cards_PinInputs */
/** @typedef {{}} Cards_Pin_Changed_ToastInputs */
/** @typedef {{}} Cards_Pin_ConfirmInputs */
/** @typedef {{}} Cards_Pin_CurrentInputs */
/** @typedef {{}} Cards_Pin_HintInputs */
/** @typedef {{}} Cards_Pin_MismatchInputs */
/** @typedef {{}} Cards_Pin_NewInputs */
/** @typedef {{}} Cards_State_BlockedInputs */
/** @typedef {{}} Cards_TitleInputs */
/** @typedef {{}} Cards_UnblockInputs */
/** @typedef {{}} Cards_Unblocked_ToastInputs */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_Balance_AfterInputs */
/** @typedef {{}} Common_Bank_NameInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_Category_DepositInputs */
/** @typedef {{}} Common_Category_FoodInputs */
/** @typedef {{}} Common_Category_HousingInputs */
/** @typedef {{}} Common_Category_LeisureInputs */
/** @typedef {{}} Common_Category_OtherInputs */
/** @typedef {{}} Common_Category_SalaryInputs */
/** @typedef {{}} Common_Category_ShoppingInputs */
/** @typedef {{}} Common_Category_TransferInputs */
/** @typedef {{}} Common_Category_TransportInputs */
/** @typedef {{}} Common_Category_WithdrawalInputs */
/** @typedef {{}} Common_CloseInputs */
/** @typedef {{}} Common_ContinueInputs */
/** @typedef {{}} Common_Customer_AreaInputs */
/** @typedef {{}} Common_Empty_HintInputs */
/** @typedef {{}} Common_Empty_TitleInputs */
/** @typedef {{}} Common_Enterprise_AreaInputs */
/** @typedef {{}} Common_KeepInputs */
/** @typedef {{}} Common_NoInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_Theme_ToggleInputs */
/** @typedef {{}} Common_TodayInputs */
/** @typedef {{}} Common_YesInputs */
/** @typedef {{}} Common_YesterdayInputs */
/** @typedef {{}} Dashboard_AccountsInputs */
/** @typedef {{}} Dashboard_Action_DepositInputs */
/** @typedef {{}} Dashboard_Action_StatementInputs */
/** @typedef {{}} Dashboard_Action_TransferInputs */
/** @typedef {{}} Dashboard_Action_WithdrawInputs */
/** @typedef {{}} Dashboard_Main_AccountInputs */
/** @typedef {{}} Dashboard_Month_InInputs */
/** @typedef {{}} Dashboard_Month_OutInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Dashboard_Monthly_DeltaInputs */
/** @typedef {{}} Dashboard_Quick_ActionsInputs */
/** @typedef {{}} Dashboard_RecentInputs */
/** @typedef {{}} Dashboard_SoonInputs */
/** @typedef {{}} Dashboard_Total_BalanceInputs */
/** @typedef {{}} Enterprise_Access_EmptyInputs */
/** @typedef {{}} Enterprise_Access_GrantInputs */
/** @typedef {{}} Enterprise_Access_Grant_ConfirmInputs */
/** @typedef {{ label: NonNullable<unknown> }} Enterprise_Access_Grant_TextInputs */
/** @typedef {{}} Enterprise_Access_HintInputs */
/** @typedef {{}} Enterprise_Access_LevelInputs */
/** @typedef {{}} Enterprise_Access_RemovedInputs */
/** @typedef {{}} Enterprise_Access_RevokeInputs */
/** @typedef {{}} Enterprise_Access_SavedInputs */
/** @typedef {{}} Enterprise_Access_SpendInputs */
/** @typedef {{}} Enterprise_Access_Spend_HintInputs */
/** @typedef {{}} Enterprise_Access_TitleInputs */
/** @typedef {{}} Enterprise_Access_ViewInputs */
/** @typedef {{}} Enterprise_Access_View_HintInputs */
/** @typedef {{}} Enterprise_Account_MainInputs */
/** @typedef {{}} Enterprise_Account_OpenInputs */
/** @typedef {{ name: NonNullable<unknown> }} Enterprise_Account_Open_TextInputs */
/** @typedef {{}} Enterprise_Account_Rename_TextInputs */
/** @typedef {{}} Enterprise_Account_ShareInputs */
/** @typedef {{}} Enterprise_AccountsInputs */
/** @typedef {{}} Enterprise_Accounts_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Enterprise_Cards_ActiveInputs */
/** @typedef {{}} Enterprise_Cards_EmptyInputs */
/** @typedef {{}} Enterprise_Cards_HintInputs */
/** @typedef {{}} Enterprise_Cards_IssueInputs */
/** @typedef {{}} Enterprise_Cards_Issue_ConfirmInputs */
/** @typedef {{ label: NonNullable<unknown> }} Enterprise_Cards_Issue_TextInputs */
/** @typedef {{}} Enterprise_Cards_IssuedInputs */
/** @typedef {{}} Enterprise_Cards_LimitInputs */
/** @typedef {{}} Enterprise_Cards_Limit_HintInputs */
/** @typedef {{}} Enterprise_Cards_Limit_SavedInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Enterprise_Cards_Limit_SpentInputs */
/** @typedef {{ holder: NonNullable<unknown> }} Enterprise_Cards_Limit_TextInputs */
/** @typedef {{}} Enterprise_Cards_ManageInputs */
/** @typedef {{}} Enterprise_Cards_Overview_CapsInputs */
/** @typedef {{ blocked: NonNullable<unknown> }} Enterprise_Cards_Overview_HintInputs */
/** @typedef {{}} Enterprise_Cards_SpentInputs */
/** @typedef {{}} Enterprise_Cards_TitleInputs */
/** @typedef {{ share: NonNullable<unknown> }} Enterprise_Cards_UsedInputs */
/** @typedef {{}} Enterprise_Chart_HintInputs */
/** @typedef {{}} Enterprise_Chart_TitleInputs */
/** @typedef {{}} Enterprise_Chart_TodayInputs */
/** @typedef {{ count: NonNullable<unknown> }} Enterprise_EmployeesInputs */
/** @typedef {{}} Enterprise_Empty_HintInputs */
/** @typedef {{}} Enterprise_Empty_TitleInputs */
/** @typedef {{}} Enterprise_History_All_AuthorsInputs */
/** @typedef {{}} Enterprise_History_AuthorInputs */
/** @typedef {{}} Enterprise_History_TitleInputs */
/** @typedef {{}} Enterprise_Kpi_ExpensesInputs */
/** @typedef {{}} Enterprise_Kpi_NetInputs */
/** @typedef {{}} Enterprise_Kpi_PeriodInputs */
/** @typedef {{}} Enterprise_Kpi_RevenueInputs */
/** @typedef {{}} Enterprise_Kpi_TreasuryInputs */
/** @typedef {{ count: NonNullable<unknown> }} Enterprise_Kpi_Treasury_HintInputs */
/** @typedef {{}} Enterprise_Kpi_Trend_HintInputs */
/** @typedef {{}} Enterprise_LabelInputs */
/** @typedef {{}} Enterprise_MemberInputs */
/** @typedef {{}} Enterprise_OperationsInputs */
/** @typedef {{}} Enterprise_Operations_EmptyInputs */
/** @typedef {{}} Enterprise_SpendingInputs */
/** @typedef {{}} Enterprise_Spending_EmptyInputs */
/** @typedef {{}} Enterprise_Spending_HintInputs */
/** @typedef {{}} Enterprise_Suppliers_AddInputs */
/** @typedef {{}} Enterprise_Suppliers_Add_TextInputs */
/** @typedef {{}} Enterprise_Suppliers_EmptyInputs */
/** @typedef {{}} Enterprise_Suppliers_LabelInputs */
/** @typedef {{}} Enterprise_Suppliers_TitleInputs */
/** @typedef {{}} Enterprise_Switch_CompanyInputs */
/** @typedef {{ name: NonNullable<unknown> }} Enterprise_Transfer_Confirm_TextInputs */
/** @typedef {{}} Enterprise_Transfer_Done_TextInputs */
/** @typedef {{}} Enterprise_Transfer_Internal_EmptyInputs */
/** @typedef {{}} Enterprise_Transfer_Kpi_AvailableInputs */
/** @typedef {{}} Enterprise_Transfer_Kpi_ReceivedInputs */
/** @typedef {{}} Enterprise_Transfer_Kpi_SentInputs */
/** @typedef {{}} Enterprise_Transfer_Label_HintInputs */
/** @typedef {{}} Enterprise_Transfer_Label_PlaceholderInputs */
/** @typedef {{}} Enterprise_Transfer_NewInputs */
/** @typedef {{}} Enterprise_Transfer_New_TextInputs */
/** @typedef {{}} Enterprise_Transfer_SignedInputs */
/** @typedef {{}} Enterprise_Transfer_Target_InternalInputs */
/** @typedef {{}} Enterprise_Transfer_Target_SupplierInputs */
/** @typedef {{}} Enterprise_Transfer_TraceInputs */
/** @typedef {{}} Enterprise_Transfers_TitleInputs */
/** @typedef {{}} Error_Account_LimitInputs */
/** @typedef {{}} Error_Already_OnboardedInputs */
/** @typedef {{}} Error_Amount_LimitInputs */
/** @typedef {{}} Error_Balance_Not_ZeroInputs */
/** @typedef {{}} Error_Beneficiary_LimitInputs */
/** @typedef {{}} Error_Card_LimitInputs */
/** @typedef {{}} Error_ClosedInputs */
/** @typedef {{}} Error_Duplicate_BeneficiaryInputs */
/** @typedef {{}} Error_FrozenInputs */
/** @typedef {{}} Error_GenericInputs */
/** @typedef {{}} Error_Insufficient_BalanceInputs */
/** @typedef {{}} Error_Invalid_AmountInputs */
/** @typedef {{}} Error_Invalid_LabelInputs */
/** @typedef {{}} Error_Invalid_PinInputs */
/** @typedef {{}} Error_Invalid_PreferencesInputs */
/** @typedef {{}} Error_Last_AccountInputs */
/** @typedef {{}} Error_Main_AccountInputs */
/** @typedef {{}} Error_Not_MemberInputs */
/** @typedef {{}} Error_Not_OwnerInputs */
/** @typedef {{}} Error_Pin_LockedInputs */
/** @typedef {{}} Error_Same_AccountInputs */
/** @typedef {{}} Error_Self_BeneficiaryInputs */
/** @typedef {{}} Error_Too_FarInputs */
/** @typedef {{}} Error_UnknownInputs */
/** @typedef {{}} Error_Unknown_RecipientInputs */
/** @typedef {{}} Error_UnreachableInputs */
/** @typedef {{}} Error_Wrong_PinInputs */
/** @typedef {{}} History_All_AccountsInputs */
/** @typedef {{}} History_ClearInputs */
/** @typedef {{}} History_Day_NetInputs */
/** @typedef {{}} History_Detail_AccountInputs */
/** @typedef {{}} History_Detail_ReferenceInputs */
/** @typedef {{}} History_Detail_See_AccountInputs */
/** @typedef {{}} History_Detail_TitleInputs */
/** @typedef {{}} History_Direction_AllInputs */
/** @typedef {{}} History_Direction_InInputs */
/** @typedef {{}} History_Direction_OutInputs */
/** @typedef {{}} History_Empty_HintInputs */
/** @typedef {{}} History_Empty_TitleInputs */
/** @typedef {{}} History_EndInputs */
/** @typedef {{}} History_Filter_AccountInputs */
/** @typedef {{}} History_Filter_DirectionInputs */
/** @typedef {{}} History_Load_MoreInputs */
/** @typedef {{}} History_Period_AllInputs */
/** @typedef {{ days: NonNullable<unknown> }} History_Period_DaysInputs */
/** @typedef {{}} History_Search_PlaceholderInputs */
/** @typedef {{}} History_Summary_CountInputs */
/** @typedef {{}} History_Summary_InInputs */
/** @typedef {{}} History_Summary_NetInputs */
/** @typedef {{}} History_Summary_OutInputs */
/** @typedef {{}} History_TitleInputs */
/** @typedef {{}} Intro_Code_LabelInputs */
/** @typedef {{}} Intro_Code_VerifyingInputs */
/** @typedef {{ name: NonNullable<unknown> }} Intro_GreetingInputs */
/** @typedef {{}} Intro_Greeting_SubInputs */
/** @typedef {{}} Intro_Loading_StatusInputs */
/** @typedef {{}} Nav_AccountsInputs */
/** @typedef {{}} Nav_DashboardInputs */
/** @typedef {{}} Nav_EnterpriseInputs */
/** @typedef {{}} Nav_Enterprise_HintInputs */
/** @typedef {{}} Nav_HistoryInputs */
/** @typedef {{}} Nav_PersonalInputs */
/** @typedef {{}} Nav_Personal_HintInputs */
/** @typedef {{}} Nav_SectionInputs */
/** @typedef {{}} Nav_SettingsInputs */
/** @typedef {{}} Nav_SoonInputs */
/** @typedef {{}} Nav_TransfersInputs */
/** @typedef {{}} Nav_WorkspaceInputs */
/** @typedef {{}} Onboarding_Account_TextInputs */
/** @typedef {{}} Onboarding_Account_TitleInputs */
/** @typedef {{}} Onboarding_Card_SwitchInputs */
/** @typedef {{}} Onboarding_Card_Switch_HintInputs */
/** @typedef {{}} Onboarding_Default_LabelInputs */
/** @typedef {{}} Onboarding_Done_CtaInputs */
/** @typedef {{}} Onboarding_Done_TextInputs */
/** @typedef {{}} Onboarding_Done_TitleInputs */
/** @typedef {{}} Onboarding_Feature_Account_TextInputs */
/** @typedef {{}} Onboarding_Feature_Account_TitleInputs */
/** @typedef {{}} Onboarding_Feature_Card_TextInputs */
/** @typedef {{}} Onboarding_Feature_Card_TitleInputs */
/** @typedef {{}} Onboarding_Feature_Safe_TextInputs */
/** @typedef {{}} Onboarding_Feature_Safe_TitleInputs */
/** @typedef {{}} Onboarding_Identity_AttestInputs */
/** @typedef {{}} Onboarding_Identity_Birth_DateInputs */
/** @typedef {{}} Onboarding_Identity_First_NameInputs */
/** @typedef {{}} Onboarding_Identity_Last_NameInputs */
/** @typedef {{}} Onboarding_Identity_TextInputs */
/** @typedef {{}} Onboarding_Identity_TitleInputs */
/** @typedef {{}} Onboarding_Rail_HintInputs */
/** @typedef {{}} Onboarding_Rail_LabelInputs */
/** @typedef {{}} Onboarding_Review_CardInputs */
/** @typedef {{}} Onboarding_Review_HolderInputs */
/** @typedef {{}} Onboarding_Review_Opening_BalanceInputs */
/** @typedef {{}} Onboarding_Review_TermsInputs */
/** @typedef {{}} Onboarding_Review_TextInputs */
/** @typedef {{}} Onboarding_Review_TitleInputs */
/** @typedef {{}} Onboarding_SignInputs */
/** @typedef {{}} Onboarding_SigningInputs */
/** @typedef {{}} Onboarding_StartInputs */
/** @typedef {{}} Onboarding_Step_AccountInputs */
/** @typedef {{}} Onboarding_Step_DoneInputs */
/** @typedef {{}} Onboarding_Step_IdentityInputs */
/** @typedef {{}} Onboarding_Step_ReviewInputs */
/** @typedef {{}} Onboarding_Step_WelcomeInputs */
/** @typedef {{}} Onboarding_Welcome_LabelInputs */
/** @typedef {{}} Onboarding_Welcome_TextInputs */
/** @typedef {{ name: NonNullable<unknown> }} Onboarding_Welcome_TitleInputs */
/** @typedef {{}} Settings_Block_AllInputs */
/** @typedef {{}} Settings_Block_All_ActionInputs */
/** @typedef {{}} Settings_Block_All_AfterInputs */
/** @typedef {{ count: NonNullable<unknown> }} Settings_Block_All_Confirm_TextInputs */
/** @typedef {{}} Settings_Block_All_HintInputs */
/** @typedef {{ count: NonNullable<unknown> }} Settings_Block_All_ToastInputs */
/** @typedef {{}} Settings_Cards_StateInputs */
/** @typedef {{ active: NonNullable<unknown>, blocked: NonNullable<unknown> }} Settings_Cards_State_ValueInputs */
/** @typedef {{}} Settings_DiscreetInputs */
/** @typedef {{}} Settings_Discreet_HintInputs */
/** @typedef {{}} Settings_Discreet_OffInputs */
/** @typedef {{}} Settings_Discreet_OnInputs */
/** @typedef {{}} Settings_Display_TextInputs */
/** @typedef {{}} Settings_Display_TitleInputs */
/** @typedef {{}} Settings_IntroInputs */
/** @typedef {{}} Settings_Intro_HintInputs */
/** @typedef {{}} Settings_Low_BalanceInputs */
/** @typedef {{}} Settings_Low_Balance_OffInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Settings_Low_Balance_OnInputs */
/** @typedef {{}} Settings_Manage_CardsInputs */
/** @typedef {{}} Settings_Notifications_TextInputs */
/** @typedef {{}} Settings_Notifications_TitleInputs */
/** @typedef {{}} Settings_Notify_IncomingInputs */
/** @typedef {{}} Settings_Notify_Incoming_HintInputs */
/** @typedef {{}} Settings_Notify_OutgoingInputs */
/** @typedef {{}} Settings_Notify_Outgoing_HintInputs */
/** @typedef {{}} Settings_Profile_HolderInputs */
/** @typedef {{}} Settings_Profile_NumberInputs */
/** @typedef {{}} Settings_Profile_ProductsInputs */
/** @typedef {{ accounts: NonNullable<unknown>, cards: NonNullable<unknown> }} Settings_Profile_Products_ValueInputs */
/** @typedef {{}} Settings_Profile_SinceInputs */
/** @typedef {{}} Settings_Profile_TextInputs */
/** @typedef {{}} Settings_Profile_TitleInputs */
/** @typedef {{}} Settings_Security_TextInputs */
/** @typedef {{}} Settings_Security_TitleInputs */
/** @typedef {{}} Settings_ThemeInputs */
/** @typedef {{}} Settings_Theme_DarkInputs */
/** @typedef {{}} Settings_Theme_HintInputs */
/** @typedef {{}} Settings_Theme_LightInputs */
/** @typedef {{}} Settings_TitleInputs */
/** @typedef {{}} Switch_Enterprise_TitleInputs */
/** @typedef {{}} Switch_LabelInputs */
/** @typedef {{}} Switch_Personal_TitleInputs */
/** @typedef {{}} Transfers_AmountInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Transfers_Amount_BoundsInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Transfers_AvailableInputs */
/** @typedef {{}} Transfers_Beneficiary_EmptyInputs */
/** @typedef {{}} Transfers_ConfirmInputs */
/** @typedef {{}} Transfers_Confirm_TextInputs */
/** @typedef {{}} Transfers_Confirm_TitleInputs */
/** @typedef {{}} Transfers_Done_TextInputs */
/** @typedef {{}} Transfers_Done_TitleInputs */
/** @typedef {{ holder: NonNullable<unknown> }} Transfers_Done_ToInputs */
/** @typedef {{}} Transfers_FeeInputs */
/** @typedef {{ fee: NonNullable<unknown> }} Transfers_Fee_LineInputs */
/** @typedef {{}} Transfers_FromInputs */
/** @typedef {{}} Transfers_LabelInputs */
/** @typedef {{ max: NonNullable<unknown> }} Transfers_Label_HintInputs */
/** @typedef {{}} Transfers_Label_PlaceholderInputs */
/** @typedef {{}} Transfers_Mine_EmptyInputs */
/** @typedef {{}} Transfers_NewInputs */
/** @typedef {{}} Transfers_New_TextInputs */
/** @typedef {{}} Transfers_No_Account_HintInputs */
/** @typedef {{}} Transfers_No_FeeInputs */
/** @typedef {{}} Transfers_NumberInputs */
/** @typedef {{}} Transfers_Number_HintInputs */
/** @typedef {{}} Transfers_RecentInputs */
/** @typedef {{}} Transfers_Recent_EmptyInputs */
/** @typedef {{}} Transfers_Recent_HintInputs */
/** @typedef {{}} Transfers_Target_BeneficiaryInputs */
/** @typedef {{}} Transfers_Target_MineInputs */
/** @typedef {{}} Transfers_Target_NumberInputs */
/** @typedef {{}} Transfers_TitleInputs */
/** @typedef {{}} Transfers_ToInputs */
/** @typedef {{}} Transfers_TotalInputs */
/** @typedef {{ total: NonNullable<unknown> }} Transfers_Total_LineInputs */
/** @typedef {{ holder: NonNullable<unknown> }} Transfers_VerifiedInputs */
/** @typedef {{}} Transfers_VerifyInputs */
import * as __fr from "./fr.js"
import * as __en from "./en.js"
/**
* | output |
* | --- |
* | "Balance" |
*
* @param {Accounts_BalanceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_balance = /** @type {((inputs?: Accounts_BalanceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_BalanceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_balance(inputs)
	return __fr.accounts_balance(inputs)
});
/**
* | output |
* | --- |
* | "Close the account" |
*
* @param {Accounts_CloseInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_close = /** @type {((inputs?: Accounts_CloseInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_CloseInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_close(inputs)
	return __fr.accounts_close(inputs)
});
/**
* | output |
* | --- |
* | "{count} card(s) cancelled" |
*
* @param {Accounts_Close_CardsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_close_cards = /** @type {((inputs: Accounts_Close_CardsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Close_CardsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_close_cards(inputs)
	return __fr.accounts_close_cards(inputs)
});
/**
* | output |
* | --- |
* | "Close" |
*
* @param {Accounts_Close_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_close_confirm = /** @type {((inputs?: Accounts_Close_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Close_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_close_confirm(inputs)
	return __fr.accounts_close_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Closing is final. The balance must be zero and the attached cards will be cancelled." |
*
* @param {Accounts_Close_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_close_text = /** @type {((inputs?: Accounts_Close_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Close_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_close_text(inputs)
	return __fr.accounts_close_text(inputs)
});
/**
* | output |
* | --- |
* | "{label} is closed" |
*
* @param {Accounts_Closed_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_closed_toast = /** @type {((inputs: Accounts_Closed_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Closed_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_closed_toast(inputs)
	return __fr.accounts_closed_toast(inputs)
});
/**
* | output |
* | --- |
* | "{count} accounts" |
*
* @param {Accounts_CountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_count = /** @type {((inputs: Accounts_CountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_CountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_count(inputs)
	return __fr.accounts_count(inputs)
});
/**
* | output |
* | --- |
* | "No account to show" |
*
* @param {Accounts_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_empty = /** @type {((inputs?: Accounts_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_empty(inputs)
	return __fr.accounts_empty(inputs)
});
/**
* | output |
* | --- |
* | "Type" |
*
* @param {Accounts_KindInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_kind = /** @type {((inputs?: Accounts_KindInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_KindInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_kind(inputs)
	return __fr.accounts_kind(inputs)
});
/**
* | output |
* | --- |
* | "Account name" |
*
* @param {Accounts_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_label = /** @type {((inputs?: Accounts_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_label(inputs)
	return __fr.accounts_label(inputs)
});
/**
* | output |
* | --- |
* | "Between 2 and {max} characters" |
*
* @param {Accounts_Label_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_label_hint = /** @type {((inputs: Accounts_Label_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Label_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_label_hint(inputs)
	return __fr.accounts_label_hint(inputs)
});
/**
* | output |
* | --- |
* | "Savings, Projects, Rent…" |
*
* @param {Accounts_Label_PlaceholderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_label_placeholder = /** @type {((inputs?: Accounts_Label_PlaceholderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Label_PlaceholderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_label_placeholder(inputs)
	return __fr.accounts_label_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "{count} / {max}" |
*
* @param {Accounts_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_limit = /** @type {((inputs: Accounts_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_limit(inputs)
	return __fr.accounts_limit(inputs)
});
/**
* | output |
* | --- |
* | "Main" |
*
* @param {Accounts_MainInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_main = /** @type {((inputs?: Accounts_MainInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_MainInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_main(inputs)
	return __fr.accounts_main(inputs)
});
/**
* | output |
* | --- |
* | "{label} is now your main account" |
*
* @param {Accounts_Main_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_main_toast = /** @type {((inputs: Accounts_Main_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Main_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_main_toast(inputs)
	return __fr.accounts_main_toast(inputs)
});
/**
* | output |
* | --- |
* | "Number" |
*
* @param {Accounts_NumberInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_number = /** @type {((inputs?: Accounts_NumberInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_NumberInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_number(inputs)
	return __fr.accounts_number(inputs)
});
/**
* | output |
* | --- |
* | "Open an account" |
*
* @param {Accounts_OpenInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_open = /** @type {((inputs?: Accounts_OpenInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_OpenInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_open(inputs)
	return __fr.accounts_open(inputs)
});
/**
* | output |
* | --- |
* | "Open" |
*
* @param {Accounts_Open_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_open_confirm = /** @type {((inputs?: Accounts_Open_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Open_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_open_confirm(inputs)
	return __fr.accounts_open_confirm(inputs)
});
/**
* | output |
* | --- |
* | "A new personal account, opened immediately and free of charge." |
*
* @param {Accounts_Open_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_open_text = /** @type {((inputs?: Accounts_Open_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Open_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_open_text(inputs)
	return __fr.accounts_open_text(inputs)
});
/**
* | output |
* | --- |
* | "{label} is open" |
*
* @param {Accounts_Opened_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_opened_toast = /** @type {((inputs: Accounts_Opened_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Opened_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_opened_toast(inputs)
	return __fr.accounts_opened_toast(inputs)
});
/**
* | output |
* | --- |
* | "Personal" |
*
* @param {Accounts_PersonalInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_personal = /** @type {((inputs?: Accounts_PersonalInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_PersonalInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_personal(inputs)
	return __fr.accounts_personal(inputs)
});
/**
* | output |
* | --- |
* | "Rename" |
*
* @param {Accounts_RenameInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_rename = /** @type {((inputs?: Accounts_RenameInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_RenameInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_rename(inputs)
	return __fr.accounts_rename(inputs)
});
/**
* | output |
* | --- |
* | "The name only shows in your customer area." |
*
* @param {Accounts_Rename_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_rename_text = /** @type {((inputs?: Accounts_Rename_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Rename_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_rename_text(inputs)
	return __fr.accounts_rename_text(inputs)
});
/**
* | output |
* | --- |
* | "Account renamed" |
*
* @param {Accounts_Renamed_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_renamed_toast = /** @type {((inputs?: Accounts_Renamed_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Renamed_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_renamed_toast(inputs)
	return __fr.accounts_renamed_toast(inputs)
});
/**
* | output |
* | --- |
* | "My accounts" |
*
* @param {Accounts_Section_MineInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_section_mine = /** @type {((inputs?: Accounts_Section_MineInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Section_MineInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_section_mine(inputs)
	return __fr.accounts_section_mine(inputs)
});
/**
* | output |
* | --- |
* | "Its cards and activity will show here" |
*
* @param {Accounts_Select_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_select_hint = /** @type {((inputs?: Accounts_Select_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Select_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_select_hint(inputs)
	return __fr.accounts_select_hint(inputs)
});
/**
* | output |
* | --- |
* | "Select an account" |
*
* @param {Accounts_Select_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_select_title = /** @type {((inputs?: Accounts_Select_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Select_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_select_title(inputs)
	return __fr.accounts_select_title(inputs)
});
/**
* | output |
* | --- |
* | "Set as main" |
*
* @param {Accounts_Set_MainInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_set_main = /** @type {((inputs?: Accounts_Set_MainInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Set_MainInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_set_main(inputs)
	return __fr.accounts_set_main(inputs)
});
/**
* | output |
* | --- |
* | "Active" |
*
* @param {Accounts_State_ActiveInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_state_active = /** @type {((inputs?: Accounts_State_ActiveInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_State_ActiveInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_state_active(inputs)
	return __fr.accounts_state_active(inputs)
});
/**
* | output |
* | --- |
* | "Frozen" |
*
* @param {Accounts_State_FrozenInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_state_frozen = /** @type {((inputs?: Accounts_State_FrozenInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_State_FrozenInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_state_frozen(inputs)
	return __fr.accounts_state_frozen(inputs)
});
/**
* | output |
* | --- |
* | "Your accounts and cards" |
*
* @param {Accounts_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_title = /** @type {((inputs?: Accounts_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_title(inputs)
	return __fr.accounts_title(inputs)
});
/**
* | output |
* | --- |
* | "Activity" |
*
* @param {Accounts_TransactionsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const accounts_transactions = /** @type {((inputs?: Accounts_TransactionsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_TransactionsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.accounts_transactions(inputs)
	return __fr.accounts_transactions(inputs)
});
/**
* | output |
* | --- |
* | "Add a beneficiary" |
*
* @param {Beneficiaries_AddInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_add = /** @type {((inputs?: Beneficiaries_AddInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_AddInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_add(inputs)
	return __fr.beneficiaries_add(inputs)
});
/**
* | output |
* | --- |
* | "Enter their account number, verify the holder, then give them a name." |
*
* @param {Beneficiaries_Add_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_add_text = /** @type {((inputs?: Beneficiaries_Add_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_Add_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_add_text(inputs)
	return __fr.beneficiaries_add_text(inputs)
});
/**
* | output |
* | --- |
* | "{label} added to your beneficiaries" |
*
* @param {Beneficiaries_Added_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_added_toast = /** @type {((inputs: Beneficiaries_Added_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_Added_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_added_toast(inputs)
	return __fr.beneficiaries_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Save the people you often send money to." |
*
* @param {Beneficiaries_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_empty = /** @type {((inputs?: Beneficiaries_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_empty(inputs)
	return __fr.beneficiaries_empty(inputs)
});
/**
* | output |
* | --- |
* | "Beneficiary name" |
*
* @param {Beneficiaries_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_label = /** @type {((inputs?: Beneficiaries_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_label(inputs)
	return __fr.beneficiaries_label(inputs)
});
/**
* | output |
* | --- |
* | "Remove" |
*
* @param {Beneficiaries_RemoveInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_remove = /** @type {((inputs?: Beneficiaries_RemoveInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_RemoveInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_remove(inputs)
	return __fr.beneficiaries_remove(inputs)
});
/**
* | output |
* | --- |
* | "{label} removed from your beneficiaries" |
*
* @param {Beneficiaries_Removed_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_removed_toast = /** @type {((inputs: Beneficiaries_Removed_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_Removed_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_removed_toast(inputs)
	return __fr.beneficiaries_removed_toast(inputs)
});
/**
* | output |
* | --- |
* | "Send money" |
*
* @param {Beneficiaries_SendInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_send = /** @type {((inputs?: Beneficiaries_SendInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_SendInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_send(inputs)
	return __fr.beneficiaries_send(inputs)
});
/**
* | output |
* | --- |
* | "Beneficiaries" |
*
* @param {Beneficiaries_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const beneficiaries_title = /** @type {((inputs?: Beneficiaries_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Beneficiaries_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.beneficiaries_title(inputs)
	return __fr.beneficiaries_title(inputs)
});
/**
* | output |
* | --- |
* | "Block" |
*
* @param {Cards_BlockInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_block = /** @type {((inputs?: Cards_BlockInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_BlockInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_block(inputs)
	return __fr.cards_block(inputs)
});
/**
* | output |
* | --- |
* | "Card blocked" |
*
* @param {Cards_Blocked_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_blocked_toast = /** @type {((inputs?: Cards_Blocked_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Blocked_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_blocked_toast(inputs)
	return __fr.cards_blocked_toast(inputs)
});
/**
* | output |
* | --- |
* | "Cancel the card" |
*
* @param {Cards_CancelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_cancel = /** @type {((inputs?: Cards_CancelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_CancelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_cancel(inputs)
	return __fr.cards_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Cancel the card" |
*
* @param {Cards_Cancel_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_cancel_confirm = /** @type {((inputs?: Cards_Cancel_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Cancel_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_cancel_confirm(inputs)
	return __fr.cards_cancel_confirm(inputs)
});
/**
* | output |
* | --- |
* | "The card will be permanently unusable. You may order a new one." |
*
* @param {Cards_Cancel_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_cancel_text = /** @type {((inputs?: Cards_Cancel_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Cancel_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_cancel_text(inputs)
	return __fr.cards_cancel_text(inputs)
});
/**
* | output |
* | --- |
* | "Card cancelled" |
*
* @param {Cards_Cancelled_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_cancelled_toast = /** @type {((inputs?: Cards_Cancelled_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Cancelled_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_cancelled_toast(inputs)
	return __fr.cards_cancelled_toast(inputs)
});
/**
* | output |
* | --- |
* | "Change the code" |
*
* @param {Cards_Change_PinInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_change_pin = /** @type {((inputs?: Cards_Change_PinInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Change_PinInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_change_pin(inputs)
	return __fr.cards_change_pin(inputs)
});
/**
* | output |
* | --- |
* | "Card {number}. Enter the current code, then the new one." |
*
* @param {Cards_Change_Pin_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_change_pin_text = /** @type {((inputs: Cards_Change_Pin_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Change_Pin_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_change_pin_text(inputs)
	return __fr.cards_change_pin_text(inputs)
});
/**
* | output |
* | --- |
* | "Expires" |
*
* @param {Cards_ExpiresInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_expires = /** @type {((inputs?: Cards_ExpiresInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_ExpiresInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_expires(inputs)
	return __fr.cards_expires(inputs)
});
/**
* | output |
* | --- |
* | "Holder" |
*
* @param {Cards_HolderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_holder = /** @type {((inputs?: Cards_HolderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_HolderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_holder(inputs)
	return __fr.cards_holder(inputs)
});
/**
* | output |
* | --- |
* | "{count} / {max}" |
*
* @param {Cards_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_limit = /** @type {((inputs: Cards_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_limit(inputs)
	return __fr.cards_limit(inputs)
});
/**
* | output |
* | --- |
* | "No card on this account" |
*
* @param {Cards_NoneInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_none = /** @type {((inputs?: Cards_NoneInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_NoneInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_none(inputs)
	return __fr.cards_none(inputs)
});
/**
* | output |
* | --- |
* | "Order a card" |
*
* @param {Cards_OrderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_order = /** @type {((inputs?: Cards_OrderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_OrderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_order(inputs)
	return __fr.cards_order(inputs)
});
/**
* | output |
* | --- |
* | "Order" |
*
* @param {Cards_Order_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_order_confirm = /** @type {((inputs?: Cards_Order_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Order_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_order_confirm(inputs)
	return __fr.cards_order_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Free of charge, active immediately" |
*
* @param {Cards_Order_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_order_hint = /** @type {((inputs?: Cards_Order_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Order_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_order_hint(inputs)
	return __fr.cards_order_hint(inputs)
});
/**
* | output |
* | --- |
* | "Choose the four-digit code that will protect the card." |
*
* @param {Cards_Order_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_order_text = /** @type {((inputs?: Cards_Order_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Order_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_order_text(inputs)
	return __fr.cards_order_text(inputs)
});
/**
* | output |
* | --- |
* | "Your card is ready" |
*
* @param {Cards_Ordered_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_ordered_toast = /** @type {((inputs?: Cards_Ordered_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Ordered_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_ordered_toast(inputs)
	return __fr.cards_ordered_toast(inputs)
});
/**
* | output |
* | --- |
* | "PIN code" |
*
* @param {Cards_PinInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin = /** @type {((inputs?: Cards_PinInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_PinInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin(inputs)
	return __fr.cards_pin(inputs)
});
/**
* | output |
* | --- |
* | "Code changed" |
*
* @param {Cards_Pin_Changed_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin_changed_toast = /** @type {((inputs?: Cards_Pin_Changed_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Pin_Changed_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin_changed_toast(inputs)
	return __fr.cards_pin_changed_toast(inputs)
});
/**
* | output |
* | --- |
* | "Confirm the code" |
*
* @param {Cards_Pin_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin_confirm = /** @type {((inputs?: Cards_Pin_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Pin_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin_confirm(inputs)
	return __fr.cards_pin_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Current code" |
*
* @param {Cards_Pin_CurrentInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin_current = /** @type {((inputs?: Cards_Pin_CurrentInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Pin_CurrentInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin_current(inputs)
	return __fr.cards_pin_current(inputs)
});
/**
* | output |
* | --- |
* | "Four digits, never share it" |
*
* @param {Cards_Pin_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin_hint = /** @type {((inputs?: Cards_Pin_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Pin_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin_hint(inputs)
	return __fr.cards_pin_hint(inputs)
});
/**
* | output |
* | --- |
* | "The two codes do not match" |
*
* @param {Cards_Pin_MismatchInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin_mismatch = /** @type {((inputs?: Cards_Pin_MismatchInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Pin_MismatchInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin_mismatch(inputs)
	return __fr.cards_pin_mismatch(inputs)
});
/**
* | output |
* | --- |
* | "New code" |
*
* @param {Cards_Pin_NewInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_pin_new = /** @type {((inputs?: Cards_Pin_NewInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Pin_NewInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_pin_new(inputs)
	return __fr.cards_pin_new(inputs)
});
/**
* | output |
* | --- |
* | "Blocked" |
*
* @param {Cards_State_BlockedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_state_blocked = /** @type {((inputs?: Cards_State_BlockedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_State_BlockedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_state_blocked(inputs)
	return __fr.cards_state_blocked(inputs)
});
/**
* | output |
* | --- |
* | "Cards" |
*
* @param {Cards_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_title = /** @type {((inputs?: Cards_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_title(inputs)
	return __fr.cards_title(inputs)
});
/**
* | output |
* | --- |
* | "Unblock" |
*
* @param {Cards_UnblockInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_unblock = /** @type {((inputs?: Cards_UnblockInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_UnblockInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_unblock(inputs)
	return __fr.cards_unblock(inputs)
});
/**
* | output |
* | --- |
* | "Card unblocked" |
*
* @param {Cards_Unblocked_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const cards_unblocked_toast = /** @type {((inputs?: Cards_Unblocked_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cards_Unblocked_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.cards_unblocked_toast(inputs)
	return __fr.cards_unblocked_toast(inputs)
});
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Common_BackInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_back = /** @type {((inputs?: Common_BackInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BackInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_back(inputs)
	return __fr.common_back(inputs)
});
/**
* | output |
* | --- |
* | "Balance after" |
*
* @param {Common_Balance_AfterInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_balance_after = /** @type {((inputs?: Common_Balance_AfterInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Balance_AfterInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_balance_after(inputs)
	return __fr.common_balance_after(inputs)
});
/**
* | output |
* | --- |
* | "SIKU Bank" |
*
* @param {Common_Bank_NameInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_bank_name = /** @type {((inputs?: Common_Bank_NameInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Bank_NameInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_bank_name(inputs)
	return __fr.common_bank_name(inputs)
});
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Common_CancelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_cancel = /** @type {((inputs?: Common_CancelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CancelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_cancel(inputs)
	return __fr.common_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Deposit" |
*
* @param {Common_Category_DepositInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_deposit = /** @type {((inputs?: Common_Category_DepositInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_DepositInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_deposit(inputs)
	return __fr.common_category_deposit(inputs)
});
/**
* | output |
* | --- |
* | "Food" |
*
* @param {Common_Category_FoodInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_food = /** @type {((inputs?: Common_Category_FoodInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_FoodInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_food(inputs)
	return __fr.common_category_food(inputs)
});
/**
* | output |
* | --- |
* | "Housing" |
*
* @param {Common_Category_HousingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_housing = /** @type {((inputs?: Common_Category_HousingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_HousingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_housing(inputs)
	return __fr.common_category_housing(inputs)
});
/**
* | output |
* | --- |
* | "Leisure" |
*
* @param {Common_Category_LeisureInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_leisure = /** @type {((inputs?: Common_Category_LeisureInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_LeisureInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_leisure(inputs)
	return __fr.common_category_leisure(inputs)
});
/**
* | output |
* | --- |
* | "Other" |
*
* @param {Common_Category_OtherInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_other = /** @type {((inputs?: Common_Category_OtherInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_OtherInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_other(inputs)
	return __fr.common_category_other(inputs)
});
/**
* | output |
* | --- |
* | "Salary" |
*
* @param {Common_Category_SalaryInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_salary = /** @type {((inputs?: Common_Category_SalaryInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_SalaryInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_salary(inputs)
	return __fr.common_category_salary(inputs)
});
/**
* | output |
* | --- |
* | "Shopping" |
*
* @param {Common_Category_ShoppingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_shopping = /** @type {((inputs?: Common_Category_ShoppingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_ShoppingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_shopping(inputs)
	return __fr.common_category_shopping(inputs)
});
/**
* | output |
* | --- |
* | "Transfer" |
*
* @param {Common_Category_TransferInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_transfer = /** @type {((inputs?: Common_Category_TransferInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_TransferInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_transfer(inputs)
	return __fr.common_category_transfer(inputs)
});
/**
* | output |
* | --- |
* | "Transport" |
*
* @param {Common_Category_TransportInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_transport = /** @type {((inputs?: Common_Category_TransportInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_TransportInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_transport(inputs)
	return __fr.common_category_transport(inputs)
});
/**
* | output |
* | --- |
* | "Withdrawal" |
*
* @param {Common_Category_WithdrawalInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_category_withdrawal = /** @type {((inputs?: Common_Category_WithdrawalInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Category_WithdrawalInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_category_withdrawal(inputs)
	return __fr.common_category_withdrawal(inputs)
});
/**
* | output |
* | --- |
* | "Close" |
*
* @param {Common_CloseInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_close = /** @type {((inputs?: Common_CloseInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CloseInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_close(inputs)
	return __fr.common_close(inputs)
});
/**
* | output |
* | --- |
* | "Continue" |
*
* @param {Common_ContinueInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_continue = /** @type {((inputs?: Common_ContinueInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ContinueInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_continue(inputs)
	return __fr.common_continue(inputs)
});
/**
* | output |
* | --- |
* | "Customer area" |
*
* @param {Common_Customer_AreaInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_customer_area = /** @type {((inputs?: Common_Customer_AreaInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Customer_AreaInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_customer_area(inputs)
	return __fr.common_customer_area(inputs)
});
/**
* | output |
* | --- |
* | "Activity will appear here" |
*
* @param {Common_Empty_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_empty_hint = /** @type {((inputs?: Common_Empty_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Empty_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_empty_hint(inputs)
	return __fr.common_empty_hint(inputs)
});
/**
* | output |
* | --- |
* | "Nothing to show" |
*
* @param {Common_Empty_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_empty_title = /** @type {((inputs?: Common_Empty_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Empty_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_empty_title(inputs)
	return __fr.common_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Enterprise area" |
*
* @param {Common_Enterprise_AreaInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_enterprise_area = /** @type {((inputs?: Common_Enterprise_AreaInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Enterprise_AreaInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_enterprise_area(inputs)
	return __fr.common_enterprise_area(inputs)
});
/**
* | output |
* | --- |
* | "Keep" |
*
* @param {Common_KeepInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_keep = /** @type {((inputs?: Common_KeepInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_KeepInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_keep(inputs)
	return __fr.common_keep(inputs)
});
/**
* | output |
* | --- |
* | "No" |
*
* @param {Common_NoInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_no = /** @type {((inputs?: Common_NoInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NoInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_no(inputs)
	return __fr.common_no(inputs)
});
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Common_SaveInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_save = /** @type {((inputs?: Common_SaveInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SaveInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_save(inputs)
	return __fr.common_save(inputs)
});
/**
* | output |
* | --- |
* | "Switch theme" |
*
* @param {Common_Theme_ToggleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_theme_toggle = /** @type {((inputs?: Common_Theme_ToggleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Theme_ToggleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_theme_toggle(inputs)
	return __fr.common_theme_toggle(inputs)
});
/**
* | output |
* | --- |
* | "Today" |
*
* @param {Common_TodayInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_today = /** @type {((inputs?: Common_TodayInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_TodayInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_today(inputs)
	return __fr.common_today(inputs)
});
/**
* | output |
* | --- |
* | "Yes" |
*
* @param {Common_YesInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_yes = /** @type {((inputs?: Common_YesInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_YesInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_yes(inputs)
	return __fr.common_yes(inputs)
});
/**
* | output |
* | --- |
* | "Yesterday" |
*
* @param {Common_YesterdayInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const common_yesterday = /** @type {((inputs?: Common_YesterdayInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_YesterdayInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_yesterday(inputs)
	return __fr.common_yesterday(inputs)
});
/**
* | output |
* | --- |
* | "Your accounts" |
*
* @param {Dashboard_AccountsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_accounts = /** @type {((inputs?: Dashboard_AccountsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_AccountsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_accounts(inputs)
	return __fr.dashboard_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Deposit" |
*
* @param {Dashboard_Action_DepositInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_action_deposit = /** @type {((inputs?: Dashboard_Action_DepositInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Action_DepositInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_action_deposit(inputs)
	return __fr.dashboard_action_deposit(inputs)
});
/**
* | output |
* | --- |
* | "Statement" |
*
* @param {Dashboard_Action_StatementInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_action_statement = /** @type {((inputs?: Dashboard_Action_StatementInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Action_StatementInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_action_statement(inputs)
	return __fr.dashboard_action_statement(inputs)
});
/**
* | output |
* | --- |
* | "Transfer" |
*
* @param {Dashboard_Action_TransferInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_action_transfer = /** @type {((inputs?: Dashboard_Action_TransferInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Action_TransferInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_action_transfer(inputs)
	return __fr.dashboard_action_transfer(inputs)
});
/**
* | output |
* | --- |
* | "Withdraw" |
*
* @param {Dashboard_Action_WithdrawInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_action_withdraw = /** @type {((inputs?: Dashboard_Action_WithdrawInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Action_WithdrawInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_action_withdraw(inputs)
	return __fr.dashboard_action_withdraw(inputs)
});
/**
* | output |
* | --- |
* | "Main account" |
*
* @param {Dashboard_Main_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_main_account = /** @type {((inputs?: Dashboard_Main_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Main_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_main_account(inputs)
	return __fr.dashboard_main_account(inputs)
});
/**
* | output |
* | --- |
* | "In" |
*
* @param {Dashboard_Month_InInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_month_in = /** @type {((inputs?: Dashboard_Month_InInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Month_InInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_month_in(inputs)
	return __fr.dashboard_month_in(inputs)
});
/**
* | output |
* | --- |
* | "Out" |
*
* @param {Dashboard_Month_OutInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_month_out = /** @type {((inputs?: Dashboard_Month_OutInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Month_OutInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_month_out(inputs)
	return __fr.dashboard_month_out(inputs)
});
/**
* | output |
* | --- |
* | "{amount} over the last 30 days" |
*
* @param {Dashboard_Monthly_DeltaInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_monthly_delta = /** @type {((inputs: Dashboard_Monthly_DeltaInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Monthly_DeltaInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_monthly_delta(inputs)
	return __fr.dashboard_monthly_delta(inputs)
});
/**
* | output |
* | --- |
* | "Quick actions" |
*
* @param {Dashboard_Quick_ActionsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_quick_actions = /** @type {((inputs?: Dashboard_Quick_ActionsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Quick_ActionsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_quick_actions(inputs)
	return __fr.dashboard_quick_actions(inputs)
});
/**
* | output |
* | --- |
* | "Recent activity" |
*
* @param {Dashboard_RecentInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_recent = /** @type {((inputs?: Dashboard_RecentInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_RecentInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_recent(inputs)
	return __fr.dashboard_recent(inputs)
});
/**
* | output |
* | --- |
* | "This action will be available soon" |
*
* @param {Dashboard_SoonInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_soon = /** @type {((inputs?: Dashboard_SoonInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_SoonInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_soon(inputs)
	return __fr.dashboard_soon(inputs)
});
/**
* | output |
* | --- |
* | "Total balance" |
*
* @param {Dashboard_Total_BalanceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const dashboard_total_balance = /** @type {((inputs?: Dashboard_Total_BalanceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Total_BalanceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.dashboard_total_balance(inputs)
	return __fr.dashboard_total_balance(inputs)
});
/**
* | output |
* | --- |
* | "Only the management reaches this account." |
*
* @param {Enterprise_Access_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_empty = /** @type {((inputs?: Enterprise_Access_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_empty(inputs)
	return __fr.enterprise_access_empty(inputs)
});
/**
* | output |
* | --- |
* | "Give access" |
*
* @param {Enterprise_Access_GrantInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_grant = /** @type {((inputs?: Enterprise_Access_GrantInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_GrantInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_grant(inputs)
	return __fr.enterprise_access_grant(inputs)
});
/**
* | output |
* | --- |
* | "Give access" |
*
* @param {Enterprise_Access_Grant_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_grant_confirm = /** @type {((inputs?: Enterprise_Access_Grant_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_Grant_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_grant_confirm(inputs)
	return __fr.enterprise_access_grant_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Pick an employee and what they may do on {label}." |
*
* @param {Enterprise_Access_Grant_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_grant_text = /** @type {((inputs: Enterprise_Access_Grant_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_Grant_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_grant_text(inputs)
	return __fr.enterprise_access_grant_text(inputs)
});
/**
* | output |
* | --- |
* | "Who reads this account, and who may spend from it" |
*
* @param {Enterprise_Access_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_hint = /** @type {((inputs?: Enterprise_Access_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_hint(inputs)
	return __fr.enterprise_access_hint(inputs)
});
/**
* | output |
* | --- |
* | "Access level" |
*
* @param {Enterprise_Access_LevelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_level = /** @type {((inputs?: Enterprise_Access_LevelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_LevelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_level(inputs)
	return __fr.enterprise_access_level(inputs)
});
/**
* | output |
* | --- |
* | "Access removed" |
*
* @param {Enterprise_Access_RemovedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_removed = /** @type {((inputs?: Enterprise_Access_RemovedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_RemovedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_removed(inputs)
	return __fr.enterprise_access_removed(inputs)
});
/**
* | output |
* | --- |
* | "Remove access" |
*
* @param {Enterprise_Access_RevokeInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_revoke = /** @type {((inputs?: Enterprise_Access_RevokeInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_RevokeInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_revoke(inputs)
	return __fr.enterprise_access_revoke(inputs)
});
/**
* | output |
* | --- |
* | "Access updated" |
*
* @param {Enterprise_Access_SavedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_saved = /** @type {((inputs?: Enterprise_Access_SavedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_SavedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_saved(inputs)
	return __fr.enterprise_access_saved(inputs)
});
/**
* | output |
* | --- |
* | "Payment" |
*
* @param {Enterprise_Access_SpendInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_spend = /** @type {((inputs?: Enterprise_Access_SpendInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_SpendInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_spend(inputs)
	return __fr.enterprise_access_spend(inputs)
});
/**
* | output |
* | --- |
* | "May also pay and transfer" |
*
* @param {Enterprise_Access_Spend_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_spend_hint = /** @type {((inputs?: Enterprise_Access_Spend_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_Spend_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_spend_hint(inputs)
	return __fr.enterprise_access_spend_hint(inputs)
});
/**
* | output |
* | --- |
* | "Employee access" |
*
* @param {Enterprise_Access_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_title = /** @type {((inputs?: Enterprise_Access_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_title(inputs)
	return __fr.enterprise_access_title(inputs)
});
/**
* | output |
* | --- |
* | "Read only" |
*
* @param {Enterprise_Access_ViewInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_view = /** @type {((inputs?: Enterprise_Access_ViewInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_ViewInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_view(inputs)
	return __fr.enterprise_access_view(inputs)
});
/**
* | output |
* | --- |
* | "Sees the balance and activity" |
*
* @param {Enterprise_Access_View_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_access_view_hint = /** @type {((inputs?: Enterprise_Access_View_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Access_View_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_access_view_hint(inputs)
	return __fr.enterprise_access_view_hint(inputs)
});
/**
* | output |
* | --- |
* | "Main account" |
*
* @param {Enterprise_Account_MainInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_account_main = /** @type {((inputs?: Enterprise_Account_MainInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Account_MainInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_account_main(inputs)
	return __fr.enterprise_account_main(inputs)
});
/**
* | output |
* | --- |
* | "Open an account" |
*
* @param {Enterprise_Account_OpenInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_account_open = /** @type {((inputs?: Enterprise_Account_OpenInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Account_OpenInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_account_open(inputs)
	return __fr.enterprise_account_open(inputs)
});
/**
* | output |
* | --- |
* | "A new account in the name of {name}, to set aside a reserve, a project or an activity." |
*
* @param {Enterprise_Account_Open_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_account_open_text = /** @type {((inputs: Enterprise_Account_Open_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Account_Open_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_account_open_text(inputs)
	return __fr.enterprise_account_open_text(inputs)
});
/**
* | output |
* | --- |
* | "The name only shows in the enterprise area." |
*
* @param {Enterprise_Account_Rename_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_account_rename_text = /** @type {((inputs?: Enterprise_Account_Rename_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Account_Rename_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_account_rename_text(inputs)
	return __fr.enterprise_account_rename_text(inputs)
});
/**
* | output |
* | --- |
* | "Share of the treasury" |
*
* @param {Enterprise_Account_ShareInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_account_share = /** @type {((inputs?: Enterprise_Account_ShareInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Account_ShareInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_account_share(inputs)
	return __fr.enterprise_account_share(inputs)
});
/**
* | output |
* | --- |
* | "Company accounts" |
*
* @param {Enterprise_AccountsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_accounts = /** @type {((inputs?: Enterprise_AccountsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_AccountsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_accounts(inputs)
	return __fr.enterprise_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Company accounts" |
*
* @param {Enterprise_Accounts_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_accounts_title = /** @type {((inputs?: Enterprise_Accounts_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Accounts_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_accounts_title(inputs)
	return __fr.enterprise_accounts_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} active" |
*
* @param {Enterprise_Cards_ActiveInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_active = /** @type {((inputs: Enterprise_Cards_ActiveInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_ActiveInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_active(inputs)
	return __fr.enterprise_cards_active(inputs)
});
/**
* | output |
* | --- |
* | "No card is attached to this account." |
*
* @param {Enterprise_Cards_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_empty = /** @type {((inputs?: Enterprise_Cards_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_empty(inputs)
	return __fr.enterprise_cards_empty(inputs)
});
/**
* | output |
* | --- |
* | "One card per employee, with a monthly cap" |
*
* @param {Enterprise_Cards_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_hint = /** @type {((inputs?: Enterprise_Cards_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_hint(inputs)
	return __fr.enterprise_cards_hint(inputs)
});
/**
* | output |
* | --- |
* | "Issue a card" |
*
* @param {Enterprise_Cards_IssueInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_issue = /** @type {((inputs?: Enterprise_Cards_IssueInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_IssueInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_issue(inputs)
	return __fr.enterprise_cards_issue(inputs)
});
/**
* | output |
* | --- |
* | "Issue" |
*
* @param {Enterprise_Cards_Issue_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_issue_confirm = /** @type {((inputs?: Enterprise_Cards_Issue_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Issue_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_issue_confirm(inputs)
	return __fr.enterprise_cards_issue_confirm(inputs)
});
/**
* | output |
* | --- |
* | "The card will spend from {label}, within the chosen cap." |
*
* @param {Enterprise_Cards_Issue_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_issue_text = /** @type {((inputs: Enterprise_Cards_Issue_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Issue_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_issue_text(inputs)
	return __fr.enterprise_cards_issue_text(inputs)
});
/**
* | output |
* | --- |
* | "Card issued" |
*
* @param {Enterprise_Cards_IssuedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_issued = /** @type {((inputs?: Enterprise_Cards_IssuedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_IssuedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_issued(inputs)
	return __fr.enterprise_cards_issued(inputs)
});
/**
* | output |
* | --- |
* | "Cap" |
*
* @param {Enterprise_Cards_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_limit = /** @type {((inputs?: Enterprise_Cards_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_limit(inputs)
	return __fr.enterprise_cards_limit(inputs)
});
/**
* | output |
* | --- |
* | "Monthly spending cap" |
*
* @param {Enterprise_Cards_Limit_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_limit_hint = /** @type {((inputs?: Enterprise_Cards_Limit_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Limit_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_limit_hint(inputs)
	return __fr.enterprise_cards_limit_hint(inputs)
});
/**
* | output |
* | --- |
* | "Cap updated" |
*
* @param {Enterprise_Cards_Limit_SavedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_limit_saved = /** @type {((inputs?: Enterprise_Cards_Limit_SavedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Limit_SavedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_limit_saved(inputs)
	return __fr.enterprise_cards_limit_saved(inputs)
});
/**
* | output |
* | --- |
* | "Already spent this month: {amount}" |
*
* @param {Enterprise_Cards_Limit_SpentInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_limit_spent = /** @type {((inputs: Enterprise_Cards_Limit_SpentInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Limit_SpentInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_limit_spent(inputs)
	return __fr.enterprise_cards_limit_spent(inputs)
});
/**
* | output |
* | --- |
* | "Card of {holder}. The new cap applies right away." |
*
* @param {Enterprise_Cards_Limit_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_limit_text = /** @type {((inputs: Enterprise_Cards_Limit_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Limit_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_limit_text(inputs)
	return __fr.enterprise_cards_limit_text(inputs)
});
/**
* | output |
* | --- |
* | "Manage the cards" |
*
* @param {Enterprise_Cards_ManageInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_manage = /** @type {((inputs?: Enterprise_Cards_ManageInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_ManageInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_manage(inputs)
	return __fr.enterprise_cards_manage(inputs)
});
/**
* | output |
* | --- |
* | "Caps used" |
*
* @param {Enterprise_Cards_Overview_CapsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_overview_caps = /** @type {((inputs?: Enterprise_Cards_Overview_CapsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Overview_CapsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_overview_caps(inputs)
	return __fr.enterprise_cards_overview_caps(inputs)
});
/**
* | output |
* | --- |
* | "Spent this month on cards · {blocked} blocked" |
*
* @param {Enterprise_Cards_Overview_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_overview_hint = /** @type {((inputs: Enterprise_Cards_Overview_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_Overview_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_overview_hint(inputs)
	return __fr.enterprise_cards_overview_hint(inputs)
});
/**
* | output |
* | --- |
* | "Spent this month" |
*
* @param {Enterprise_Cards_SpentInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_spent = /** @type {((inputs?: Enterprise_Cards_SpentInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_SpentInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_spent(inputs)
	return __fr.enterprise_cards_spent(inputs)
});
/**
* | output |
* | --- |
* | "Company cards" |
*
* @param {Enterprise_Cards_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_title = /** @type {((inputs?: Enterprise_Cards_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_title(inputs)
	return __fr.enterprise_cards_title(inputs)
});
/**
* | output |
* | --- |
* | "{share} of the cap used" |
*
* @param {Enterprise_Cards_UsedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_cards_used = /** @type {((inputs: Enterprise_Cards_UsedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Cards_UsedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_cards_used(inputs)
	return __fr.enterprise_cards_used(inputs)
});
/**
* | output |
* | --- |
* | "Over the last 30 days, hover for details" |
*
* @param {Enterprise_Chart_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_chart_hint = /** @type {((inputs?: Enterprise_Chart_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Chart_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_chart_hint(inputs)
	return __fr.enterprise_chart_hint(inputs)
});
/**
* | output |
* | --- |
* | "Treasury" |
*
* @param {Enterprise_Chart_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_chart_title = /** @type {((inputs?: Enterprise_Chart_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Chart_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_chart_title(inputs)
	return __fr.enterprise_chart_title(inputs)
});
/**
* | output |
* | --- |
* | "Today" |
*
* @param {Enterprise_Chart_TodayInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_chart_today = /** @type {((inputs?: Enterprise_Chart_TodayInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Chart_TodayInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_chart_today(inputs)
	return __fr.enterprise_chart_today(inputs)
});
/**
* | output |
* | --- |
* | "{count} employees" |
*
* @param {Enterprise_EmployeesInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_employees = /** @type {((inputs: Enterprise_EmployeesInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_EmployeesInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_employees(inputs)
	return __fr.enterprise_employees(inputs)
});
/**
* | output |
* | --- |
* | "Your companies will show here once you are given a management position" |
*
* @param {Enterprise_Empty_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_empty_hint = /** @type {((inputs?: Enterprise_Empty_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Empty_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_empty_hint(inputs)
	return __fr.enterprise_empty_hint(inputs)
});
/**
* | output |
* | --- |
* | "No company" |
*
* @param {Enterprise_Empty_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_empty_title = /** @type {((inputs?: Enterprise_Empty_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Empty_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_empty_title(inputs)
	return __fr.enterprise_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Everyone" |
*
* @param {Enterprise_History_All_AuthorsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_history_all_authors = /** @type {((inputs?: Enterprise_History_All_AuthorsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_History_All_AuthorsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_history_all_authors(inputs)
	return __fr.enterprise_history_all_authors(inputs)
});
/**
* | output |
* | --- |
* | "Author" |
*
* @param {Enterprise_History_AuthorInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_history_author = /** @type {((inputs?: Enterprise_History_AuthorInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_History_AuthorInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_history_author(inputs)
	return __fr.enterprise_history_author(inputs)
});
/**
* | output |
* | --- |
* | "Company statements" |
*
* @param {Enterprise_History_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_history_title = /** @type {((inputs?: Enterprise_History_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_History_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_history_title(inputs)
	return __fr.enterprise_history_title(inputs)
});
/**
* | output |
* | --- |
* | "Expenses" |
*
* @param {Enterprise_Kpi_ExpensesInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_expenses = /** @type {((inputs?: Enterprise_Kpi_ExpensesInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_ExpensesInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_expenses(inputs)
	return __fr.enterprise_kpi_expenses(inputs)
});
/**
* | output |
* | --- |
* | "Net result" |
*
* @param {Enterprise_Kpi_NetInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_net = /** @type {((inputs?: Enterprise_Kpi_NetInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_NetInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_net(inputs)
	return __fr.enterprise_kpi_net(inputs)
});
/**
* | output |
* | --- |
* | "Last 30 days" |
*
* @param {Enterprise_Kpi_PeriodInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_period = /** @type {((inputs?: Enterprise_Kpi_PeriodInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_PeriodInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_period(inputs)
	return __fr.enterprise_kpi_period(inputs)
});
/**
* | output |
* | --- |
* | "Revenue" |
*
* @param {Enterprise_Kpi_RevenueInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_revenue = /** @type {((inputs?: Enterprise_Kpi_RevenueInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_RevenueInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_revenue(inputs)
	return __fr.enterprise_kpi_revenue(inputs)
});
/**
* | output |
* | --- |
* | "Treasury" |
*
* @param {Enterprise_Kpi_TreasuryInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_treasury = /** @type {((inputs?: Enterprise_Kpi_TreasuryInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_TreasuryInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_treasury(inputs)
	return __fr.enterprise_kpi_treasury(inputs)
});
/**
* | output |
* | --- |
* | "Across {count} account(s)" |
*
* @param {Enterprise_Kpi_Treasury_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_treasury_hint = /** @type {((inputs: Enterprise_Kpi_Treasury_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_Treasury_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_treasury_hint(inputs)
	return __fr.enterprise_kpi_treasury_hint(inputs)
});
/**
* | output |
* | --- |
* | "vs previous 30 days" |
*
* @param {Enterprise_Kpi_Trend_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_kpi_trend_hint = /** @type {((inputs?: Enterprise_Kpi_Trend_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Kpi_Trend_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_kpi_trend_hint(inputs)
	return __fr.enterprise_kpi_trend_hint(inputs)
});
/**
* | output |
* | --- |
* | "Company" |
*
* @param {Enterprise_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_label = /** @type {((inputs?: Enterprise_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_label(inputs)
	return __fr.enterprise_label(inputs)
});
/**
* | output |
* | --- |
* | "Employee" |
*
* @param {Enterprise_MemberInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_member = /** @type {((inputs?: Enterprise_MemberInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_MemberInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_member(inputs)
	return __fr.enterprise_member(inputs)
});
/**
* | output |
* | --- |
* | "Latest operations" |
*
* @param {Enterprise_OperationsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_operations = /** @type {((inputs?: Enterprise_OperationsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_OperationsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_operations(inputs)
	return __fr.enterprise_operations(inputs)
});
/**
* | output |
* | --- |
* | "No operation" |
*
* @param {Enterprise_Operations_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_operations_empty = /** @type {((inputs?: Enterprise_Operations_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Operations_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_operations_empty(inputs)
	return __fr.enterprise_operations_empty(inputs)
});
/**
* | output |
* | --- |
* | "Spending by item" |
*
* @param {Enterprise_SpendingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_spending = /** @type {((inputs?: Enterprise_SpendingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_SpendingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_spending(inputs)
	return __fr.enterprise_spending(inputs)
});
/**
* | output |
* | --- |
* | "No spending over the period" |
*
* @param {Enterprise_Spending_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_spending_empty = /** @type {((inputs?: Enterprise_Spending_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Spending_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_spending_empty(inputs)
	return __fr.enterprise_spending_empty(inputs)
});
/**
* | output |
* | --- |
* | "Split of the last 30 days" |
*
* @param {Enterprise_Spending_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_spending_hint = /** @type {((inputs?: Enterprise_Spending_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Spending_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_spending_hint(inputs)
	return __fr.enterprise_spending_hint(inputs)
});
/**
* | output |
* | --- |
* | "Add a supplier" |
*
* @param {Enterprise_Suppliers_AddInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_suppliers_add = /** @type {((inputs?: Enterprise_Suppliers_AddInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Suppliers_AddInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_suppliers_add(inputs)
	return __fr.enterprise_suppliers_add(inputs)
});
/**
* | output |
* | --- |
* | "Enter their account number, verify the holder, then name them." |
*
* @param {Enterprise_Suppliers_Add_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_suppliers_add_text = /** @type {((inputs?: Enterprise_Suppliers_Add_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Suppliers_Add_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_suppliers_add_text(inputs)
	return __fr.enterprise_suppliers_add_text(inputs)
});
/**
* | output |
* | --- |
* | "Save the suppliers the company pays regularly." |
*
* @param {Enterprise_Suppliers_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_suppliers_empty = /** @type {((inputs?: Enterprise_Suppliers_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Suppliers_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_suppliers_empty(inputs)
	return __fr.enterprise_suppliers_empty(inputs)
});
/**
* | output |
* | --- |
* | "Supplier name" |
*
* @param {Enterprise_Suppliers_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_suppliers_label = /** @type {((inputs?: Enterprise_Suppliers_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Suppliers_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_suppliers_label(inputs)
	return __fr.enterprise_suppliers_label(inputs)
});
/**
* | output |
* | --- |
* | "Suppliers" |
*
* @param {Enterprise_Suppliers_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_suppliers_title = /** @type {((inputs?: Enterprise_Suppliers_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Suppliers_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_suppliers_title(inputs)
	return __fr.enterprise_suppliers_title(inputs)
});
/**
* | output |
* | --- |
* | "Your companies" |
*
* @param {Enterprise_Switch_CompanyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_switch_company = /** @type {((inputs?: Enterprise_Switch_CompanyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Switch_CompanyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_switch_company(inputs)
	return __fr.enterprise_switch_company(inputs)
});
/**
* | output |
* | --- |
* | "On behalf of {name}. A completed transfer cannot be reversed." |
*
* @param {Enterprise_Transfer_Confirm_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_confirm_text = /** @type {((inputs: Enterprise_Transfer_Confirm_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Confirm_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_confirm_text(inputs)
	return __fr.enterprise_transfer_confirm_text(inputs)
});
/**
* | output |
* | --- |
* | "The transfer left the company account." |
*
* @param {Enterprise_Transfer_Done_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_done_text = /** @type {((inputs?: Enterprise_Transfer_Done_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Done_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_done_text(inputs)
	return __fr.enterprise_transfer_done_text(inputs)
});
/**
* | output |
* | --- |
* | "Open a second account to move money internally." |
*
* @param {Enterprise_Transfer_Internal_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_internal_empty = /** @type {((inputs?: Enterprise_Transfer_Internal_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Internal_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_internal_empty(inputs)
	return __fr.enterprise_transfer_internal_empty(inputs)
});
/**
* | output |
* | --- |
* | "Available" |
*
* @param {Enterprise_Transfer_Kpi_AvailableInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_kpi_available = /** @type {((inputs?: Enterprise_Transfer_Kpi_AvailableInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Kpi_AvailableInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_kpi_available(inputs)
	return __fr.enterprise_transfer_kpi_available(inputs)
});
/**
* | output |
* | --- |
* | "Received" |
*
* @param {Enterprise_Transfer_Kpi_ReceivedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_kpi_received = /** @type {((inputs?: Enterprise_Transfer_Kpi_ReceivedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Kpi_ReceivedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_kpi_received(inputs)
	return __fr.enterprise_transfer_kpi_received(inputs)
});
/**
* | output |
* | --- |
* | "Sent" |
*
* @param {Enterprise_Transfer_Kpi_SentInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_kpi_sent = /** @type {((inputs?: Enterprise_Transfer_Kpi_SentInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Kpi_SentInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_kpi_sent(inputs)
	return __fr.enterprise_transfer_kpi_sent(inputs)
});
/**
* | output |
* | --- |
* | "Seen by the recipient and in the books" |
*
* @param {Enterprise_Transfer_Label_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_label_hint = /** @type {((inputs?: Enterprise_Transfer_Label_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Label_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_label_hint(inputs)
	return __fr.enterprise_transfer_label_hint(inputs)
});
/**
* | output |
* | --- |
* | "Invoice F-0042, rent, deposit…" |
*
* @param {Enterprise_Transfer_Label_PlaceholderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_label_placeholder = /** @type {((inputs?: Enterprise_Transfer_Label_PlaceholderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Label_PlaceholderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_label_placeholder(inputs)
	return __fr.enterprise_transfer_label_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "New transfer" |
*
* @param {Enterprise_Transfer_NewInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_new = /** @type {((inputs?: Enterprise_Transfer_NewInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_NewInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_new(inputs)
	return __fr.enterprise_transfer_new(inputs)
});
/**
* | output |
* | --- |
* | "Pay a supplier, feed a reserve or settle a partner." |
*
* @param {Enterprise_Transfer_New_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_new_text = /** @type {((inputs?: Enterprise_Transfer_New_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_New_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_new_text(inputs)
	return __fr.enterprise_transfer_new_text(inputs)
});
/**
* | output |
* | --- |
* | "Signed by" |
*
* @param {Enterprise_Transfer_SignedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_signed = /** @type {((inputs?: Enterprise_Transfer_SignedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_SignedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_signed(inputs)
	return __fr.enterprise_transfer_signed(inputs)
});
/**
* | output |
* | --- |
* | "Internal accounts" |
*
* @param {Enterprise_Transfer_Target_InternalInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_target_internal = /** @type {((inputs?: Enterprise_Transfer_Target_InternalInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Target_InternalInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_target_internal(inputs)
	return __fr.enterprise_transfer_target_internal(inputs)
});
/**
* | output |
* | --- |
* | "Suppliers" |
*
* @param {Enterprise_Transfer_Target_SupplierInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_target_supplier = /** @type {((inputs?: Enterprise_Transfer_Target_SupplierInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_Target_SupplierInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_target_supplier(inputs)
	return __fr.enterprise_transfer_target_supplier(inputs)
});
/**
* | output |
* | --- |
* | "Every transfer is signed with your name in the history." |
*
* @param {Enterprise_Transfer_TraceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfer_trace = /** @type {((inputs?: Enterprise_Transfer_TraceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfer_TraceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfer_trace(inputs)
	return __fr.enterprise_transfer_trace(inputs)
});
/**
* | output |
* | --- |
* | "Company transfers" |
*
* @param {Enterprise_Transfers_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const enterprise_transfers_title = /** @type {((inputs?: Enterprise_Transfers_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Enterprise_Transfers_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.enterprise_transfers_title(inputs)
	return __fr.enterprise_transfers_title(inputs)
});
/**
* | output |
* | --- |
* | "You reached the maximum number of accounts" |
*
* @param {Error_Account_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_account_limit = /** @type {((inputs?: Error_Account_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Account_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_account_limit(inputs)
	return __fr.error_account_limit(inputs)
});
/**
* | output |
* | --- |
* | "You are already a customer" |
*
* @param {Error_Already_OnboardedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_already_onboarded = /** @type {((inputs?: Error_Already_OnboardedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Already_OnboardedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_already_onboarded(inputs)
	return __fr.error_already_onboarded(inputs)
});
/**
* | output |
* | --- |
* | "This amount exceeds the allowed limits" |
*
* @param {Error_Amount_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_amount_limit = /** @type {((inputs?: Error_Amount_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Amount_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_amount_limit(inputs)
	return __fr.error_amount_limit(inputs)
});
/**
* | output |
* | --- |
* | "The balance must be zero to close the account" |
*
* @param {Error_Balance_Not_ZeroInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_balance_not_zero = /** @type {((inputs?: Error_Balance_Not_ZeroInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Balance_Not_ZeroInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_balance_not_zero(inputs)
	return __fr.error_balance_not_zero(inputs)
});
/**
* | output |
* | --- |
* | "You reached the maximum number of beneficiaries" |
*
* @param {Error_Beneficiary_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_beneficiary_limit = /** @type {((inputs?: Error_Beneficiary_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Beneficiary_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_beneficiary_limit(inputs)
	return __fr.error_beneficiary_limit(inputs)
});
/**
* | output |
* | --- |
* | "This account already has all its cards" |
*
* @param {Error_Card_LimitInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_card_limit = /** @type {((inputs?: Error_Card_LimitInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Card_LimitInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_card_limit(inputs)
	return __fr.error_card_limit(inputs)
});
/**
* | output |
* | --- |
* | "This item is closed" |
*
* @param {Error_ClosedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_closed = /** @type {((inputs?: Error_ClosedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_ClosedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_closed(inputs)
	return __fr.error_closed(inputs)
});
/**
* | output |
* | --- |
* | "This account is already among your beneficiaries" |
*
* @param {Error_Duplicate_BeneficiaryInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_duplicate_beneficiary = /** @type {((inputs?: Error_Duplicate_BeneficiaryInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Duplicate_BeneficiaryInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_duplicate_beneficiary(inputs)
	return __fr.error_duplicate_beneficiary(inputs)
});
/**
* | output |
* | --- |
* | "This account is frozen" |
*
* @param {Error_FrozenInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_frozen = /** @type {((inputs?: Error_FrozenInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_FrozenInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_frozen(inputs)
	return __fr.error_frozen(inputs)
});
/**
* | output |
* | --- |
* | "The operation could not be completed" |
*
* @param {Error_GenericInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_generic = /** @type {((inputs?: Error_GenericInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_GenericInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_generic(inputs)
	return __fr.error_generic(inputs)
});
/**
* | output |
* | --- |
* | "Insufficient balance" |
*
* @param {Error_Insufficient_BalanceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_insufficient_balance = /** @type {((inputs?: Error_Insufficient_BalanceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Insufficient_BalanceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_insufficient_balance(inputs)
	return __fr.error_insufficient_balance(inputs)
});
/**
* | output |
* | --- |
* | "This amount is not valid" |
*
* @param {Error_Invalid_AmountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_invalid_amount = /** @type {((inputs?: Error_Invalid_AmountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Invalid_AmountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_invalid_amount(inputs)
	return __fr.error_invalid_amount(inputs)
});
/**
* | output |
* | --- |
* | "This name is not valid" |
*
* @param {Error_Invalid_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_invalid_label = /** @type {((inputs?: Error_Invalid_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Invalid_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_invalid_label(inputs)
	return __fr.error_invalid_label(inputs)
});
/**
* | output |
* | --- |
* | "The code must be four digits" |
*
* @param {Error_Invalid_PinInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_invalid_pin = /** @type {((inputs?: Error_Invalid_PinInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Invalid_PinInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_invalid_pin(inputs)
	return __fr.error_invalid_pin(inputs)
});
/**
* | output |
* | --- |
* | "This setting is not valid" |
*
* @param {Error_Invalid_PreferencesInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_invalid_preferences = /** @type {((inputs?: Error_Invalid_PreferencesInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Invalid_PreferencesInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_invalid_preferences(inputs)
	return __fr.error_invalid_preferences(inputs)
});
/**
* | output |
* | --- |
* | "You must keep at least one account" |
*
* @param {Error_Last_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_last_account = /** @type {((inputs?: Error_Last_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Last_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_last_account(inputs)
	return __fr.error_last_account(inputs)
});
/**
* | output |
* | --- |
* | "The main account cannot be closed" |
*
* @param {Error_Main_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_main_account = /** @type {((inputs?: Error_Main_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Main_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_main_account(inputs)
	return __fr.error_main_account(inputs)
});
/**
* | output |
* | --- |
* | "This person does not work for the company" |
*
* @param {Error_Not_MemberInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_not_member = /** @type {((inputs?: Error_Not_MemberInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Not_MemberInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_not_member(inputs)
	return __fr.error_not_member(inputs)
});
/**
* | output |
* | --- |
* | "You do not hold this account" |
*
* @param {Error_Not_OwnerInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_not_owner = /** @type {((inputs?: Error_Not_OwnerInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Not_OwnerInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_not_owner(inputs)
	return __fr.error_not_owner(inputs)
});
/**
* | output |
* | --- |
* | "Too many attempts, the card is locked" |
*
* @param {Error_Pin_LockedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_pin_locked = /** @type {((inputs?: Error_Pin_LockedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Pin_LockedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_pin_locked(inputs)
	return __fr.error_pin_locked(inputs)
});
/**
* | output |
* | --- |
* | "The sending and receiving accounts are the same" |
*
* @param {Error_Same_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_same_account = /** @type {((inputs?: Error_Same_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Same_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_same_account(inputs)
	return __fr.error_same_account(inputs)
});
/**
* | output |
* | --- |
* | "Your own accounts are already at hand" |
*
* @param {Error_Self_BeneficiaryInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_self_beneficiary = /** @type {((inputs?: Error_Self_BeneficiaryInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Self_BeneficiaryInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_self_beneficiary(inputs)
	return __fr.error_self_beneficiary(inputs)
});
/**
* | output |
* | --- |
* | "Step closer to an advisor" |
*
* @param {Error_Too_FarInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_too_far = /** @type {((inputs?: Error_Too_FarInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Too_FarInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_too_far(inputs)
	return __fr.error_too_far(inputs)
});
/**
* | output |
* | --- |
* | "This item no longer exists" |
*
* @param {Error_UnknownInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_unknown = /** @type {((inputs?: Error_UnknownInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_UnknownInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_unknown(inputs)
	return __fr.error_unknown(inputs)
});
/**
* | output |
* | --- |
* | "No account carries this number" |
*
* @param {Error_Unknown_RecipientInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_unknown_recipient = /** @type {((inputs?: Error_Unknown_RecipientInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Unknown_RecipientInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_unknown_recipient(inputs)
	return __fr.error_unknown_recipient(inputs)
});
/**
* | output |
* | --- |
* | "The bank is not answering, try again" |
*
* @param {Error_UnreachableInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_unreachable = /** @type {((inputs?: Error_UnreachableInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_UnreachableInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_unreachable(inputs)
	return __fr.error_unreachable(inputs)
});
/**
* | output |
* | --- |
* | "Wrong current code" |
*
* @param {Error_Wrong_PinInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const error_wrong_pin = /** @type {((inputs?: Error_Wrong_PinInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Error_Wrong_PinInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.error_wrong_pin(inputs)
	return __fr.error_wrong_pin(inputs)
});
/**
* | output |
* | --- |
* | "All" |
*
* @param {History_All_AccountsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_all_accounts = /** @type {((inputs?: History_All_AccountsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_All_AccountsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_all_accounts(inputs)
	return __fr.history_all_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Clear filters" |
*
* @param {History_ClearInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_clear = /** @type {((inputs?: History_ClearInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_ClearInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_clear(inputs)
	return __fr.history_clear(inputs)
});
/**
* | output |
* | --- |
* | "Day net" |
*
* @param {History_Day_NetInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_day_net = /** @type {((inputs?: History_Day_NetInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Day_NetInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_day_net(inputs)
	return __fr.history_day_net(inputs)
});
/**
* | output |
* | --- |
* | "Account" |
*
* @param {History_Detail_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_detail_account = /** @type {((inputs?: History_Detail_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Detail_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_detail_account(inputs)
	return __fr.history_detail_account(inputs)
});
/**
* | output |
* | --- |
* | "Reference" |
*
* @param {History_Detail_ReferenceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_detail_reference = /** @type {((inputs?: History_Detail_ReferenceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Detail_ReferenceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_detail_reference(inputs)
	return __fr.history_detail_reference(inputs)
});
/**
* | output |
* | --- |
* | "See this account" |
*
* @param {History_Detail_See_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_detail_see_account = /** @type {((inputs?: History_Detail_See_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Detail_See_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_detail_see_account(inputs)
	return __fr.history_detail_see_account(inputs)
});
/**
* | output |
* | --- |
* | "Operation details" |
*
* @param {History_Detail_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_detail_title = /** @type {((inputs?: History_Detail_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Detail_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_detail_title(inputs)
	return __fr.history_detail_title(inputs)
});
/**
* | output |
* | --- |
* | "All" |
*
* @param {History_Direction_AllInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_direction_all = /** @type {((inputs?: History_Direction_AllInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Direction_AllInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_direction_all(inputs)
	return __fr.history_direction_all(inputs)
});
/**
* | output |
* | --- |
* | "In" |
*
* @param {History_Direction_InInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_direction_in = /** @type {((inputs?: History_Direction_InInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Direction_InInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_direction_in(inputs)
	return __fr.history_direction_in(inputs)
});
/**
* | output |
* | --- |
* | "Out" |
*
* @param {History_Direction_OutInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_direction_out = /** @type {((inputs?: History_Direction_OutInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Direction_OutInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_direction_out(inputs)
	return __fr.history_direction_out(inputs)
});
/**
* | output |
* | --- |
* | "Widen the period or clear the filters" |
*
* @param {History_Empty_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_empty_hint = /** @type {((inputs?: History_Empty_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Empty_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_empty_hint(inputs)
	return __fr.history_empty_hint(inputs)
});
/**
* | output |
* | --- |
* | "No operation" |
*
* @param {History_Empty_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_empty_title = /** @type {((inputs?: History_Empty_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Empty_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_empty_title(inputs)
	return __fr.history_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "You have seen everything" |
*
* @param {History_EndInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_end = /** @type {((inputs?: History_EndInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_EndInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_end(inputs)
	return __fr.history_end(inputs)
});
/**
* | output |
* | --- |
* | "Account" |
*
* @param {History_Filter_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_filter_account = /** @type {((inputs?: History_Filter_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Filter_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_filter_account(inputs)
	return __fr.history_filter_account(inputs)
});
/**
* | output |
* | --- |
* | "Direction" |
*
* @param {History_Filter_DirectionInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_filter_direction = /** @type {((inputs?: History_Filter_DirectionInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Filter_DirectionInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_filter_direction(inputs)
	return __fr.history_filter_direction(inputs)
});
/**
* | output |
* | --- |
* | "Load more operations" |
*
* @param {History_Load_MoreInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_load_more = /** @type {((inputs?: History_Load_MoreInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Load_MoreInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_load_more(inputs)
	return __fr.history_load_more(inputs)
});
/**
* | output |
* | --- |
* | "All" |
*
* @param {History_Period_AllInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_period_all = /** @type {((inputs?: History_Period_AllInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Period_AllInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_period_all(inputs)
	return __fr.history_period_all(inputs)
});
/**
* | output |
* | --- |
* | "{days} d" |
*
* @param {History_Period_DaysInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_period_days = /** @type {((inputs: History_Period_DaysInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Period_DaysInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_period_days(inputs)
	return __fr.history_period_days(inputs)
});
/**
* | output |
* | --- |
* | "Search a label…" |
*
* @param {History_Search_PlaceholderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_search_placeholder = /** @type {((inputs?: History_Search_PlaceholderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Search_PlaceholderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_search_placeholder(inputs)
	return __fr.history_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Operations" |
*
* @param {History_Summary_CountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_summary_count = /** @type {((inputs?: History_Summary_CountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Summary_CountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_summary_count(inputs)
	return __fr.history_summary_count(inputs)
});
/**
* | output |
* | --- |
* | "In" |
*
* @param {History_Summary_InInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_summary_in = /** @type {((inputs?: History_Summary_InInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Summary_InInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_summary_in(inputs)
	return __fr.history_summary_in(inputs)
});
/**
* | output |
* | --- |
* | "Net" |
*
* @param {History_Summary_NetInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_summary_net = /** @type {((inputs?: History_Summary_NetInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Summary_NetInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_summary_net(inputs)
	return __fr.history_summary_net(inputs)
});
/**
* | output |
* | --- |
* | "Out" |
*
* @param {History_Summary_OutInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_summary_out = /** @type {((inputs?: History_Summary_OutInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_Summary_OutInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_summary_out(inputs)
	return __fr.history_summary_out(inputs)
});
/**
* | output |
* | --- |
* | "All your activity" |
*
* @param {History_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const history_title = /** @type {((inputs?: History_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<History_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.history_title(inputs)
	return __fr.history_title(inputs)
});
/**
* | output |
* | --- |
* | "Security code" |
*
* @param {Intro_Code_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const intro_code_label = /** @type {((inputs?: Intro_Code_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Intro_Code_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.intro_code_label(inputs)
	return __fr.intro_code_label(inputs)
});
/**
* | output |
* | --- |
* | "Verifying" |
*
* @param {Intro_Code_VerifyingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const intro_code_verifying = /** @type {((inputs?: Intro_Code_VerifyingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Intro_Code_VerifyingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.intro_code_verifying(inputs)
	return __fr.intro_code_verifying(inputs)
});
/**
* | output |
* | --- |
* | "Hello, {name}" |
*
* @param {Intro_GreetingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const intro_greeting = /** @type {((inputs: Intro_GreetingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Intro_GreetingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.intro_greeting(inputs)
	return __fr.intro_greeting(inputs)
});
/**
* | output |
* | --- |
* | "Your accounts are ready" |
*
* @param {Intro_Greeting_SubInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const intro_greeting_sub = /** @type {((inputs?: Intro_Greeting_SubInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Intro_Greeting_SubInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.intro_greeting_sub(inputs)
	return __fr.intro_greeting_sub(inputs)
});
/**
* | output |
* | --- |
* | "Loading your accounts" |
*
* @param {Intro_Loading_StatusInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const intro_loading_status = /** @type {((inputs?: Intro_Loading_StatusInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Intro_Loading_StatusInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.intro_loading_status(inputs)
	return __fr.intro_loading_status(inputs)
});
/**
* | output |
* | --- |
* | "Accounts" |
*
* @param {Nav_AccountsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_accounts = /** @type {((inputs?: Nav_AccountsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_AccountsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_accounts(inputs)
	return __fr.nav_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Dashboard" |
*
* @param {Nav_DashboardInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_dashboard = /** @type {((inputs?: Nav_DashboardInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_DashboardInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_dashboard(inputs)
	return __fr.nav_dashboard(inputs)
});
/**
* | output |
* | --- |
* | "Enterprise mode" |
*
* @param {Nav_EnterpriseInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_enterprise = /** @type {((inputs?: Nav_EnterpriseInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_EnterpriseInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_enterprise(inputs)
	return __fr.nav_enterprise(inputs)
});
/**
* | output |
* | --- |
* | "Manage your companies" |
*
* @param {Nav_Enterprise_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_enterprise_hint = /** @type {((inputs?: Nav_Enterprise_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_Enterprise_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_enterprise_hint(inputs)
	return __fr.nav_enterprise_hint(inputs)
});
/**
* | output |
* | --- |
* | "History" |
*
* @param {Nav_HistoryInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_history = /** @type {((inputs?: Nav_HistoryInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_HistoryInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_history(inputs)
	return __fr.nav_history(inputs)
});
/**
* | output |
* | --- |
* | "Personal space" |
*
* @param {Nav_PersonalInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_personal = /** @type {((inputs?: Nav_PersonalInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_PersonalInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_personal(inputs)
	return __fr.nav_personal(inputs)
});
/**
* | output |
* | --- |
* | "Back to your accounts" |
*
* @param {Nav_Personal_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_personal_hint = /** @type {((inputs?: Nav_Personal_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_Personal_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_personal_hint(inputs)
	return __fr.nav_personal_hint(inputs)
});
/**
* | output |
* | --- |
* | "Navigation" |
*
* @param {Nav_SectionInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_section = /** @type {((inputs?: Nav_SectionInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SectionInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_section(inputs)
	return __fr.nav_section(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Nav_SettingsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_settings = /** @type {((inputs?: Nav_SettingsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SettingsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_settings(inputs)
	return __fr.nav_settings(inputs)
});
/**
* | output |
* | --- |
* | "Soon" |
*
* @param {Nav_SoonInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_soon = /** @type {((inputs?: Nav_SoonInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SoonInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_soon(inputs)
	return __fr.nav_soon(inputs)
});
/**
* | output |
* | --- |
* | "Transfers" |
*
* @param {Nav_TransfersInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_transfers = /** @type {((inputs?: Nav_TransfersInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_TransfersInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_transfers(inputs)
	return __fr.nav_transfers(inputs)
});
/**
* | output |
* | --- |
* | "Workspace" |
*
* @param {Nav_WorkspaceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const nav_workspace = /** @type {((inputs?: Nav_WorkspaceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_WorkspaceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_workspace(inputs)
	return __fr.nav_workspace(inputs)
});
/**
* | output |
* | --- |
* | "Give it a name and decide whether you want a card right away." |
*
* @param {Onboarding_Account_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_account_text = /** @type {((inputs?: Onboarding_Account_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Account_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_account_text(inputs)
	return __fr.onboarding_account_text(inputs)
});
/**
* | output |
* | --- |
* | "Set up your account" |
*
* @param {Onboarding_Account_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_account_title = /** @type {((inputs?: Onboarding_Account_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Account_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_account_title(inputs)
	return __fr.onboarding_account_title(inputs)
});
/**
* | output |
* | --- |
* | "Order a bank card" |
*
* @param {Onboarding_Card_SwitchInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_card_switch = /** @type {((inputs?: Onboarding_Card_SwitchInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Card_SwitchInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_card_switch(inputs)
	return __fr.onboarding_card_switch(inputs)
});
/**
* | output |
* | --- |
* | "Free of charge, available immediately" |
*
* @param {Onboarding_Card_Switch_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_card_switch_hint = /** @type {((inputs?: Onboarding_Card_Switch_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Card_Switch_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_card_switch_hint(inputs)
	return __fr.onboarding_card_switch_hint(inputs)
});
/**
* | output |
* | --- |
* | "Current account" |
*
* @param {Onboarding_Default_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_default_label = /** @type {((inputs?: Onboarding_Default_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Default_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_default_label(inputs)
	return __fr.onboarding_default_label(inputs)
});
/**
* | output |
* | --- |
* | "Go to my accounts" |
*
* @param {Onboarding_Done_CtaInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_done_cta = /** @type {((inputs?: Onboarding_Done_CtaInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Done_CtaInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_done_cta(inputs)
	return __fr.onboarding_done_cta(inputs)
});
/**
* | output |
* | --- |
* | "Welcome among our customers. Your access is active right now." |
*
* @param {Onboarding_Done_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_done_text = /** @type {((inputs?: Onboarding_Done_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Done_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_done_text(inputs)
	return __fr.onboarding_done_text(inputs)
});
/**
* | output |
* | --- |
* | "Your account is open" |
*
* @param {Onboarding_Done_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_done_title = /** @type {((inputs?: Onboarding_Done_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Done_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_done_title(inputs)
	return __fr.onboarding_done_title(inputs)
});
/**
* | output |
* | --- |
* | "Receive your salary, pay and keep your money safe." |
*
* @param {Onboarding_Feature_Account_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_feature_account_text = /** @type {((inputs?: Onboarding_Feature_Account_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Feature_Account_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_feature_account_text(inputs)
	return __fr.onboarding_feature_account_text(inputs)
});
/**
* | output |
* | --- |
* | "A current account" |
*
* @param {Onboarding_Feature_Account_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_feature_account_title = /** @type {((inputs?: Onboarding_Feature_Account_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Feature_Account_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_feature_account_title(inputs)
	return __fr.onboarding_feature_account_title(inputs)
});
/**
* | output |
* | --- |
* | "Protected by a four-digit code you choose." |
*
* @param {Onboarding_Feature_Card_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_feature_card_text = /** @type {((inputs?: Onboarding_Feature_Card_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Feature_Card_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_feature_card_text(inputs)
	return __fr.onboarding_feature_card_text(inputs)
});
/**
* | output |
* | --- |
* | "A bank card" |
*
* @param {Onboarding_Feature_Card_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_feature_card_title = /** @type {((inputs?: Onboarding_Feature_Card_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Feature_Card_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_feature_card_title(inputs)
	return __fr.onboarding_feature_card_title(inputs)
});
/**
* | output |
* | --- |
* | "Each movement is recorded and available at any time." |
*
* @param {Onboarding_Feature_Safe_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_feature_safe_text = /** @type {((inputs?: Onboarding_Feature_Safe_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Feature_Safe_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_feature_safe_text(inputs)
	return __fr.onboarding_feature_safe_text(inputs)
});
/**
* | output |
* | --- |
* | "Every operation tracked" |
*
* @param {Onboarding_Feature_Safe_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_feature_safe_title = /** @type {((inputs?: Onboarding_Feature_Safe_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Feature_Safe_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_feature_safe_title(inputs)
	return __fr.onboarding_feature_safe_title(inputs)
});
/**
* | output |
* | --- |
* | "I certify that these details are correct and that I open this account for my personal use." |
*
* @param {Onboarding_Identity_AttestInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_identity_attest = /** @type {((inputs?: Onboarding_Identity_AttestInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Identity_AttestInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_identity_attest(inputs)
	return __fr.onboarding_identity_attest(inputs)
});
/**
* | output |
* | --- |
* | "Date of birth" |
*
* @param {Onboarding_Identity_Birth_DateInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_identity_birth_date = /** @type {((inputs?: Onboarding_Identity_Birth_DateInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Identity_Birth_DateInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_identity_birth_date(inputs)
	return __fr.onboarding_identity_birth_date(inputs)
});
/**
* | output |
* | --- |
* | "First name" |
*
* @param {Onboarding_Identity_First_NameInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_identity_first_name = /** @type {((inputs?: Onboarding_Identity_First_NameInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Identity_First_NameInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_identity_first_name(inputs)
	return __fr.onboarding_identity_first_name(inputs)
});
/**
* | output |
* | --- |
* | "Last name" |
*
* @param {Onboarding_Identity_Last_NameInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_identity_last_name = /** @type {((inputs?: Onboarding_Identity_Last_NameInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Identity_Last_NameInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_identity_last_name(inputs)
	return __fr.onboarding_identity_last_name(inputs)
});
/**
* | output |
* | --- |
* | "These details come from your identity document. Confirm they are correct." |
*
* @param {Onboarding_Identity_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_identity_text = /** @type {((inputs?: Onboarding_Identity_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Identity_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_identity_text(inputs)
	return __fr.onboarding_identity_text(inputs)
});
/**
* | output |
* | --- |
* | "Let us verify your identity" |
*
* @param {Onboarding_Identity_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_identity_title = /** @type {((inputs?: Onboarding_Identity_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Identity_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_identity_title(inputs)
	return __fr.onboarding_identity_title(inputs)
});
/**
* | output |
* | --- |
* | "It only takes a few minutes" |
*
* @param {Onboarding_Rail_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_rail_hint = /** @type {((inputs?: Onboarding_Rail_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Rail_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_rail_hint(inputs)
	return __fr.onboarding_rail_hint(inputs)
});
/**
* | output |
* | --- |
* | "Account opening" |
*
* @param {Onboarding_Rail_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_rail_label = /** @type {((inputs?: Onboarding_Rail_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Rail_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_rail_label(inputs)
	return __fr.onboarding_rail_label(inputs)
});
/**
* | output |
* | --- |
* | "Bank card" |
*
* @param {Onboarding_Review_CardInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_review_card = /** @type {((inputs?: Onboarding_Review_CardInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Review_CardInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_review_card(inputs)
	return __fr.onboarding_review_card(inputs)
});
/**
* | output |
* | --- |
* | "Holder" |
*
* @param {Onboarding_Review_HolderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_review_holder = /** @type {((inputs?: Onboarding_Review_HolderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Review_HolderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_review_holder(inputs)
	return __fr.onboarding_review_holder(inputs)
});
/**
* | output |
* | --- |
* | "Opening balance" |
*
* @param {Onboarding_Review_Opening_BalanceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_review_opening_balance = /** @type {((inputs?: Onboarding_Review_Opening_BalanceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Review_Opening_BalanceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_review_opening_balance(inputs)
	return __fr.onboarding_review_opening_balance(inputs)
});
/**
* | output |
* | --- |
* | "By signing, you accept the general terms of SIKU Bank. The account is opened free of charge and may be closed at any time once its balance is zero." |
*
* @param {Onboarding_Review_TermsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_review_terms = /** @type {((inputs?: Onboarding_Review_TermsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Review_TermsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_review_terms(inputs)
	return __fr.onboarding_review_terms(inputs)
});
/**
* | output |
* | --- |
* | "Read the summary once more before signing the opening of your account." |
*
* @param {Onboarding_Review_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_review_text = /** @type {((inputs?: Onboarding_Review_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Review_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_review_text(inputs)
	return __fr.onboarding_review_text(inputs)
});
/**
* | output |
* | --- |
* | "Everything is ready" |
*
* @param {Onboarding_Review_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_review_title = /** @type {((inputs?: Onboarding_Review_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Review_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_review_title(inputs)
	return __fr.onboarding_review_title(inputs)
});
/**
* | output |
* | --- |
* | "Sign and open" |
*
* @param {Onboarding_SignInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_sign = /** @type {((inputs?: Onboarding_SignInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_SignInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_sign(inputs)
	return __fr.onboarding_sign(inputs)
});
/**
* | output |
* | --- |
* | "Opening" |
*
* @param {Onboarding_SigningInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_signing = /** @type {((inputs?: Onboarding_SigningInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_SigningInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_signing(inputs)
	return __fr.onboarding_signing(inputs)
});
/**
* | output |
* | --- |
* | "Get started" |
*
* @param {Onboarding_StartInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_start = /** @type {((inputs?: Onboarding_StartInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_StartInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_start(inputs)
	return __fr.onboarding_start(inputs)
});
/**
* | output |
* | --- |
* | "Your account" |
*
* @param {Onboarding_Step_AccountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_step_account = /** @type {((inputs?: Onboarding_Step_AccountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Step_AccountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_step_account(inputs)
	return __fr.onboarding_step_account(inputs)
});
/**
* | output |
* | --- |
* | "Done" |
*
* @param {Onboarding_Step_DoneInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_step_done = /** @type {((inputs?: Onboarding_Step_DoneInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Step_DoneInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_step_done(inputs)
	return __fr.onboarding_step_done(inputs)
});
/**
* | output |
* | --- |
* | "Identity" |
*
* @param {Onboarding_Step_IdentityInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_step_identity = /** @type {((inputs?: Onboarding_Step_IdentityInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Step_IdentityInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_step_identity(inputs)
	return __fr.onboarding_step_identity(inputs)
});
/**
* | output |
* | --- |
* | "Signature" |
*
* @param {Onboarding_Step_ReviewInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_step_review = /** @type {((inputs?: Onboarding_Step_ReviewInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Step_ReviewInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_step_review(inputs)
	return __fr.onboarding_step_review(inputs)
});
/**
* | output |
* | --- |
* | "Welcome" |
*
* @param {Onboarding_Step_WelcomeInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_step_welcome = /** @type {((inputs?: Onboarding_Step_WelcomeInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Step_WelcomeInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_step_welcome(inputs)
	return __fr.onboarding_step_welcome(inputs)
});
/**
* | output |
* | --- |
* | "First visit" |
*
* @param {Onboarding_Welcome_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_welcome_label = /** @type {((inputs?: Onboarding_Welcome_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Welcome_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_welcome_label(inputs)
	return __fr.onboarding_welcome_label(inputs)
});
/**
* | output |
* | --- |
* | "You do not have an account with us yet. Let us open one together: a few steps, no paperwork." |
*
* @param {Onboarding_Welcome_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_welcome_text = /** @type {((inputs?: Onboarding_Welcome_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Welcome_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_welcome_text(inputs)
	return __fr.onboarding_welcome_text(inputs)
});
/**
* | output |
* | --- |
* | "Welcome to SIKU Bank, {name}." |
*
* @param {Onboarding_Welcome_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const onboarding_welcome_title = /** @type {((inputs: Onboarding_Welcome_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Welcome_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.onboarding_welcome_title(inputs)
	return __fr.onboarding_welcome_title(inputs)
});
/**
* | output |
* | --- |
* | "Block every card" |
*
* @param {Settings_Block_AllInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_block_all = /** @type {((inputs?: Settings_Block_AllInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Block_AllInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_block_all(inputs)
	return __fr.settings_block_all(inputs)
});
/**
* | output |
* | --- |
* | "Block all" |
*
* @param {Settings_Block_All_ActionInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_block_all_action = /** @type {((inputs?: Settings_Block_All_ActionInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Block_All_ActionInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_block_all_action(inputs)
	return __fr.settings_block_all_action(inputs)
});
/**
* | output |
* | --- |
* | "You can unblock each card from the Accounts page once things are settled." |
*
* @param {Settings_Block_All_AfterInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_block_all_after = /** @type {((inputs?: Settings_Block_All_AfterInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Block_All_AfterInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_block_all_after(inputs)
	return __fr.settings_block_all_after(inputs)
});
/**
* | output |
* | --- |
* | "{count} active card(s) will be blocked right away." |
*
* @param {Settings_Block_All_Confirm_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_block_all_confirm_text = /** @type {((inputs: Settings_Block_All_Confirm_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Block_All_Confirm_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_block_all_confirm_text(inputs)
	return __fr.settings_block_all_confirm_text(inputs)
});
/**
* | output |
* | --- |
* | "Lost or stolen, in one move" |
*
* @param {Settings_Block_All_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_block_all_hint = /** @type {((inputs?: Settings_Block_All_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Block_All_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_block_all_hint(inputs)
	return __fr.settings_block_all_hint(inputs)
});
/**
* | output |
* | --- |
* | "{count} card(s) blocked" |
*
* @param {Settings_Block_All_ToastInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_block_all_toast = /** @type {((inputs: Settings_Block_All_ToastInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Block_All_ToastInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_block_all_toast(inputs)
	return __fr.settings_block_all_toast(inputs)
});
/**
* | output |
* | --- |
* | "Your cards" |
*
* @param {Settings_Cards_StateInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_cards_state = /** @type {((inputs?: Settings_Cards_StateInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Cards_StateInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_cards_state(inputs)
	return __fr.settings_cards_state(inputs)
});
/**
* | output |
* | --- |
* | "{active} active · {blocked} blocked" |
*
* @param {Settings_Cards_State_ValueInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_cards_state_value = /** @type {((inputs: Settings_Cards_State_ValueInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Cards_State_ValueInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_cards_state_value(inputs)
	return __fr.settings_cards_state_value(inputs)
});
/**
* | output |
* | --- |
* | "Discreet mode" |
*
* @param {Settings_DiscreetInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_discreet = /** @type {((inputs?: Settings_DiscreetInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_DiscreetInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_discreet(inputs)
	return __fr.settings_discreet(inputs)
});
/**
* | output |
* | --- |
* | "Masks the amounts, hover them to read" |
*
* @param {Settings_Discreet_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_discreet_hint = /** @type {((inputs?: Settings_Discreet_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Discreet_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_discreet_hint(inputs)
	return __fr.settings_discreet_hint(inputs)
});
/**
* | output |
* | --- |
* | "Show the amounts" |
*
* @param {Settings_Discreet_OffInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_discreet_off = /** @type {((inputs?: Settings_Discreet_OffInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Discreet_OffInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_discreet_off(inputs)
	return __fr.settings_discreet_off(inputs)
});
/**
* | output |
* | --- |
* | "Mask the amounts" |
*
* @param {Settings_Discreet_OnInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_discreet_on = /** @type {((inputs?: Settings_Discreet_OnInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Discreet_OnInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_discreet_on(inputs)
	return __fr.settings_discreet_on(inputs)
});
/**
* | output |
* | --- |
* | "How your customer area looks, kept from one visit to the next." |
*
* @param {Settings_Display_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_display_text = /** @type {((inputs?: Settings_Display_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Display_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_display_text(inputs)
	return __fr.settings_display_text(inputs)
});
/**
* | output |
* | --- |
* | "Display" |
*
* @param {Settings_Display_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_display_title = /** @type {((inputs?: Settings_Display_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Display_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_display_title(inputs)
	return __fr.settings_display_title(inputs)
});
/**
* | output |
* | --- |
* | "Opening animation" |
*
* @param {Settings_IntroInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_intro = /** @type {((inputs?: Settings_IntroInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_IntroInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_intro(inputs)
	return __fr.settings_intro(inputs)
});
/**
* | output |
* | --- |
* | "The security code and the greeting at every login" |
*
* @param {Settings_Intro_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_intro_hint = /** @type {((inputs?: Settings_Intro_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Intro_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_intro_hint(inputs)
	return __fr.settings_intro_hint(inputs)
});
/**
* | output |
* | --- |
* | "Low balance alert" |
*
* @param {Settings_Low_BalanceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_low_balance = /** @type {((inputs?: Settings_Low_BalanceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Low_BalanceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_low_balance(inputs)
	return __fr.settings_low_balance(inputs)
});
/**
* | output |
* | --- |
* | "Off, enter a threshold to turn it on" |
*
* @param {Settings_Low_Balance_OffInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_low_balance_off = /** @type {((inputs?: Settings_Low_Balance_OffInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Low_Balance_OffInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_low_balance_off(inputs)
	return __fr.settings_low_balance_off(inputs)
});
/**
* | output |
* | --- |
* | "Warned when an account falls under {amount}" |
*
* @param {Settings_Low_Balance_OnInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_low_balance_on = /** @type {((inputs: Settings_Low_Balance_OnInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Low_Balance_OnInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_low_balance_on(inputs)
	return __fr.settings_low_balance_on(inputs)
});
/**
* | output |
* | --- |
* | "Manage" |
*
* @param {Settings_Manage_CardsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_manage_cards = /** @type {((inputs?: Settings_Manage_CardsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Manage_CardsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_manage_cards(inputs)
	return __fr.settings_manage_cards(inputs)
});
/**
* | output |
* | --- |
* | "The alerts the bank sends you in game, wherever you are." |
*
* @param {Settings_Notifications_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_notifications_text = /** @type {((inputs?: Settings_Notifications_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Notifications_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_notifications_text(inputs)
	return __fr.settings_notifications_text(inputs)
});
/**
* | output |
* | --- |
* | "Notifications" |
*
* @param {Settings_Notifications_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_notifications_title = /** @type {((inputs?: Settings_Notifications_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Notifications_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_notifications_title(inputs)
	return __fr.settings_notifications_title(inputs)
});
/**
* | output |
* | --- |
* | "Money received" |
*
* @param {Settings_Notify_IncomingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_notify_incoming = /** @type {((inputs?: Settings_Notify_IncomingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Notify_IncomingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_notify_incoming(inputs)
	return __fr.settings_notify_incoming(inputs)
});
/**
* | output |
* | --- |
* | "A transfer or a credit reaches one of your accounts" |
*
* @param {Settings_Notify_Incoming_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_notify_incoming_hint = /** @type {((inputs?: Settings_Notify_Incoming_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Notify_Incoming_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_notify_incoming_hint(inputs)
	return __fr.settings_notify_incoming_hint(inputs)
});
/**
* | output |
* | --- |
* | "Money debited" |
*
* @param {Settings_Notify_OutgoingInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_notify_outgoing = /** @type {((inputs?: Settings_Notify_OutgoingInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Notify_OutgoingInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_notify_outgoing(inputs)
	return __fr.settings_notify_outgoing(inputs)
});
/**
* | output |
* | --- |
* | "A debit you did not make yourself" |
*
* @param {Settings_Notify_Outgoing_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_notify_outgoing_hint = /** @type {((inputs?: Settings_Notify_Outgoing_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Notify_Outgoing_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_notify_outgoing_hint(inputs)
	return __fr.settings_notify_outgoing_hint(inputs)
});
/**
* | output |
* | --- |
* | "Holder" |
*
* @param {Settings_Profile_HolderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_holder = /** @type {((inputs?: Settings_Profile_HolderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_HolderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_holder(inputs)
	return __fr.settings_profile_holder(inputs)
});
/**
* | output |
* | --- |
* | "Customer number" |
*
* @param {Settings_Profile_NumberInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_number = /** @type {((inputs?: Settings_Profile_NumberInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_NumberInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_number(inputs)
	return __fr.settings_profile_number(inputs)
});
/**
* | output |
* | --- |
* | "Products" |
*
* @param {Settings_Profile_ProductsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_products = /** @type {((inputs?: Settings_Profile_ProductsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_ProductsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_products(inputs)
	return __fr.settings_profile_products(inputs)
});
/**
* | output |
* | --- |
* | "{accounts} account(s) · {cards} card(s)" |
*
* @param {Settings_Profile_Products_ValueInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_products_value = /** @type {((inputs: Settings_Profile_Products_ValueInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_Products_ValueInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_products_value(inputs)
	return __fr.settings_profile_products_value(inputs)
});
/**
* | output |
* | --- |
* | "Customer since" |
*
* @param {Settings_Profile_SinceInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_since = /** @type {((inputs?: Settings_Profile_SinceInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_SinceInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_since(inputs)
	return __fr.settings_profile_since(inputs)
});
/**
* | output |
* | --- |
* | "What the bank knows about you. These details follow your identity document." |
*
* @param {Settings_Profile_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_text = /** @type {((inputs?: Settings_Profile_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_text(inputs)
	return __fr.settings_profile_text(inputs)
});
/**
* | output |
* | --- |
* | "Customer profile" |
*
* @param {Settings_Profile_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_profile_title = /** @type {((inputs?: Settings_Profile_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Profile_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_profile_title(inputs)
	return __fr.settings_profile_title(inputs)
});
/**
* | output |
* | --- |
* | "Stay in control of your cards, above all when one goes missing." |
*
* @param {Settings_Security_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_security_text = /** @type {((inputs?: Settings_Security_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Security_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_security_text(inputs)
	return __fr.settings_security_text(inputs)
});
/**
* | output |
* | --- |
* | "Security" |
*
* @param {Settings_Security_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_security_title = /** @type {((inputs?: Settings_Security_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Security_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_security_title(inputs)
	return __fr.settings_security_title(inputs)
});
/**
* | output |
* | --- |
* | "Theme" |
*
* @param {Settings_ThemeInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_theme = /** @type {((inputs?: Settings_ThemeInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_ThemeInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_theme(inputs)
	return __fr.settings_theme(inputs)
});
/**
* | output |
* | --- |
* | "Dark" |
*
* @param {Settings_Theme_DarkInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_theme_dark = /** @type {((inputs?: Settings_Theme_DarkInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Theme_DarkInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_theme_dark(inputs)
	return __fr.settings_theme_dark(inputs)
});
/**
* | output |
* | --- |
* | "Dark or light, as the hour and your taste suit" |
*
* @param {Settings_Theme_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_theme_hint = /** @type {((inputs?: Settings_Theme_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Theme_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_theme_hint(inputs)
	return __fr.settings_theme_hint(inputs)
});
/**
* | output |
* | --- |
* | "Light" |
*
* @param {Settings_Theme_LightInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_theme_light = /** @type {((inputs?: Settings_Theme_LightInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Theme_LightInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_theme_light(inputs)
	return __fr.settings_theme_light(inputs)
});
/**
* | output |
* | --- |
* | "Your space, your way" |
*
* @param {Settings_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const settings_title = /** @type {((inputs?: Settings_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.settings_title(inputs)
	return __fr.settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Enterprise area" |
*
* @param {Switch_Enterprise_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const switch_enterprise_title = /** @type {((inputs?: Switch_Enterprise_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Switch_Enterprise_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.switch_enterprise_title(inputs)
	return __fr.switch_enterprise_title(inputs)
});
/**
* | output |
* | --- |
* | "Switching space" |
*
* @param {Switch_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const switch_label = /** @type {((inputs?: Switch_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Switch_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.switch_label(inputs)
	return __fr.switch_label(inputs)
});
/**
* | output |
* | --- |
* | "Personal space" |
*
* @param {Switch_Personal_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const switch_personal_title = /** @type {((inputs?: Switch_Personal_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Switch_Personal_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.switch_personal_title(inputs)
	return __fr.switch_personal_title(inputs)
});
/**
* | output |
* | --- |
* | "Amount" |
*
* @param {Transfers_AmountInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_amount = /** @type {((inputs?: Transfers_AmountInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_AmountInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_amount(inputs)
	return __fr.transfers_amount(inputs)
});
/**
* | output |
* | --- |
* | "Between {min} and {max} per transfer" |
*
* @param {Transfers_Amount_BoundsInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_amount_bounds = /** @type {((inputs: Transfers_Amount_BoundsInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Amount_BoundsInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_amount_bounds(inputs)
	return __fr.transfers_amount_bounds(inputs)
});
/**
* | output |
* | --- |
* | "Available: {amount}" |
*
* @param {Transfers_AvailableInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_available = /** @type {((inputs: Transfers_AvailableInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_AvailableInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_available(inputs)
	return __fr.transfers_available(inputs)
});
/**
* | output |
* | --- |
* | "No saved beneficiary yet." |
*
* @param {Transfers_Beneficiary_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_beneficiary_empty = /** @type {((inputs?: Transfers_Beneficiary_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Beneficiary_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_beneficiary_empty(inputs)
	return __fr.transfers_beneficiary_empty(inputs)
});
/**
* | output |
* | --- |
* | "Confirm" |
*
* @param {Transfers_ConfirmInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_confirm = /** @type {((inputs?: Transfers_ConfirmInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_ConfirmInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_confirm(inputs)
	return __fr.transfers_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Check one last time: a completed transfer cannot be reversed." |
*
* @param {Transfers_Confirm_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_confirm_text = /** @type {((inputs?: Transfers_Confirm_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Confirm_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_confirm_text(inputs)
	return __fr.transfers_confirm_text(inputs)
});
/**
* | output |
* | --- |
* | "Confirm the transfer" |
*
* @param {Transfers_Confirm_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_confirm_title = /** @type {((inputs?: Transfers_Confirm_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Confirm_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_confirm_title(inputs)
	return __fr.transfers_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "The money is already on the recipient’s account." |
*
* @param {Transfers_Done_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_done_text = /** @type {((inputs?: Transfers_Done_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Done_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_done_text(inputs)
	return __fr.transfers_done_text(inputs)
});
/**
* | output |
* | --- |
* | "Transfer completed" |
*
* @param {Transfers_Done_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_done_title = /** @type {((inputs?: Transfers_Done_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Done_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_done_title(inputs)
	return __fr.transfers_done_title(inputs)
});
/**
* | output |
* | --- |
* | "sent to {holder}" |
*
* @param {Transfers_Done_ToInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_done_to = /** @type {((inputs: Transfers_Done_ToInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Done_ToInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_done_to(inputs)
	return __fr.transfers_done_to(inputs)
});
/**
* | output |
* | --- |
* | "Fee" |
*
* @param {Transfers_FeeInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_fee = /** @type {((inputs?: Transfers_FeeInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_FeeInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_fee(inputs)
	return __fr.transfers_fee(inputs)
});
/**
* | output |
* | --- |
* | "Fee: {fee}" |
*
* @param {Transfers_Fee_LineInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_fee_line = /** @type {((inputs: Transfers_Fee_LineInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Fee_LineInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_fee_line(inputs)
	return __fr.transfers_fee_line(inputs)
});
/**
* | output |
* | --- |
* | "From" |
*
* @param {Transfers_FromInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_from = /** @type {((inputs?: Transfers_FromInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_FromInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_from(inputs)
	return __fr.transfers_from(inputs)
});
/**
* | output |
* | --- |
* | "Reference" |
*
* @param {Transfers_LabelInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_label = /** @type {((inputs?: Transfers_LabelInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_LabelInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_label(inputs)
	return __fr.transfers_label(inputs)
});
/**
* | output |
* | --- |
* | "Seen by the recipient, {max} characters max" |
*
* @param {Transfers_Label_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_label_hint = /** @type {((inputs: Transfers_Label_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Label_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_label_hint(inputs)
	return __fr.transfers_label_hint(inputs)
});
/**
* | output |
* | --- |
* | "Rent, refund, gift…" |
*
* @param {Transfers_Label_PlaceholderInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_label_placeholder = /** @type {((inputs?: Transfers_Label_PlaceholderInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Label_PlaceholderInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_label_placeholder(inputs)
	return __fr.transfers_label_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Open a second account to move money between your accounts." |
*
* @param {Transfers_Mine_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_mine_empty = /** @type {((inputs?: Transfers_Mine_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Mine_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_mine_empty(inputs)
	return __fr.transfers_mine_empty(inputs)
});
/**
* | output |
* | --- |
* | "New transfer" |
*
* @param {Transfers_NewInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_new = /** @type {((inputs?: Transfers_NewInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_NewInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_new(inputs)
	return __fr.transfers_new(inputs)
});
/**
* | output |
* | --- |
* | "Immediate, to one of your accounts or to any customer of the bank." |
*
* @param {Transfers_New_TextInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_new_text = /** @type {((inputs?: Transfers_New_TextInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_New_TextInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_new_text(inputs)
	return __fr.transfers_new_text(inputs)
});
/**
* | output |
* | --- |
* | "Open an account to send money" |
*
* @param {Transfers_No_Account_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_no_account_hint = /** @type {((inputs?: Transfers_No_Account_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_No_Account_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_no_account_hint(inputs)
	return __fr.transfers_no_account_hint(inputs)
});
/**
* | output |
* | --- |
* | "No fee on this transfer" |
*
* @param {Transfers_No_FeeInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_no_fee = /** @type {((inputs?: Transfers_No_FeeInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_No_FeeInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_no_fee(inputs)
	return __fr.transfers_no_fee(inputs)
});
/**
* | output |
* | --- |
* | "Account number" |
*
* @param {Transfers_NumberInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_number = /** @type {((inputs?: Transfers_NumberInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_NumberInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_number(inputs)
	return __fr.transfers_number(inputs)
});
/**
* | output |
* | --- |
* | "Twelve digits, then verify the holder" |
*
* @param {Transfers_Number_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_number_hint = /** @type {((inputs?: Transfers_Number_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Number_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_number_hint(inputs)
	return __fr.transfers_number_hint(inputs)
});
/**
* | output |
* | --- |
* | "Latest transfers" |
*
* @param {Transfers_RecentInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_recent = /** @type {((inputs?: Transfers_RecentInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_RecentInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_recent(inputs)
	return __fr.transfers_recent(inputs)
});
/**
* | output |
* | --- |
* | "No transfer" |
*
* @param {Transfers_Recent_EmptyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_recent_empty = /** @type {((inputs?: Transfers_Recent_EmptyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Recent_EmptyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_recent_empty(inputs)
	return __fr.transfers_recent_empty(inputs)
});
/**
* | output |
* | --- |
* | "What you send and receive will show here" |
*
* @param {Transfers_Recent_HintInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_recent_hint = /** @type {((inputs?: Transfers_Recent_HintInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Recent_HintInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_recent_hint(inputs)
	return __fr.transfers_recent_hint(inputs)
});
/**
* | output |
* | --- |
* | "Beneficiaries" |
*
* @param {Transfers_Target_BeneficiaryInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_target_beneficiary = /** @type {((inputs?: Transfers_Target_BeneficiaryInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Target_BeneficiaryInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_target_beneficiary(inputs)
	return __fr.transfers_target_beneficiary(inputs)
});
/**
* | output |
* | --- |
* | "My accounts" |
*
* @param {Transfers_Target_MineInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_target_mine = /** @type {((inputs?: Transfers_Target_MineInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Target_MineInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_target_mine(inputs)
	return __fr.transfers_target_mine(inputs)
});
/**
* | output |
* | --- |
* | "Number" |
*
* @param {Transfers_Target_NumberInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_target_number = /** @type {((inputs?: Transfers_Target_NumberInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Target_NumberInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_target_number(inputs)
	return __fr.transfers_target_number(inputs)
});
/**
* | output |
* | --- |
* | "Send money" |
*
* @param {Transfers_TitleInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_title = /** @type {((inputs?: Transfers_TitleInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_TitleInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_title(inputs)
	return __fr.transfers_title(inputs)
});
/**
* | output |
* | --- |
* | "To" |
*
* @param {Transfers_ToInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_to = /** @type {((inputs?: Transfers_ToInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_ToInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_to(inputs)
	return __fr.transfers_to(inputs)
});
/**
* | output |
* | --- |
* | "Total debited" |
*
* @param {Transfers_TotalInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_total = /** @type {((inputs?: Transfers_TotalInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_TotalInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_total(inputs)
	return __fr.transfers_total(inputs)
});
/**
* | output |
* | --- |
* | "Total debited: {total}" |
*
* @param {Transfers_Total_LineInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_total_line = /** @type {((inputs: Transfers_Total_LineInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_Total_LineInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_total_line(inputs)
	return __fr.transfers_total_line(inputs)
});
/**
* | output |
* | --- |
* | "Holder: {holder}" |
*
* @param {Transfers_VerifiedInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_verified = /** @type {((inputs: Transfers_VerifiedInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_VerifiedInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_verified(inputs)
	return __fr.transfers_verified(inputs)
});
/**
* | output |
* | --- |
* | "Verify" |
*
* @param {Transfers_VerifyInputs} inputs
* @param {{ locale?: "fr" | "en" }} options
* @returns {LocalizedString}
*/
export const transfers_verify = /** @type {((inputs?: Transfers_VerifyInputs, options?: { locale?: "fr" | "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Transfers_VerifyInputs, { locale?: "fr" | "en" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.transfers_verify(inputs)
	return __fr.transfers_verify(inputs)
});