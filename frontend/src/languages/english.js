const en = {
  common: {
    cancel: "Cancel",
    next: "Next",
    submit: "Submit",
    back: "Back",
    finish: "Finish",
    comment_description: "Add some comments",
    budget: "Budget",
    comment: "Comment",
    edit: "Edit",
    created: "Created",
    status: "Status",
    actions: "Actions",
    closed: "Closed",
    assigned: "Assigned",
    not_assigned: "Not assigned",
    not_assigned_budget: "Not Assigned Budget",
    disbursement: "Projected",
    assigned_budget: "Assigned",
    disbursed_budget: "Disbursed",
    budget_distribution: "Budget distribution",
    task_status: "Task status",
    project: "Project",
    subprojects: "Subprojects",
    subproject: "Subproject",
    history: "History",
    close: "Close",
    open: "Open",
    in_progress: "In Progress",
    in_review: "In Review",
    done: "Done",
    assignees: "Assignee(s)",
    approver: "Approver",
    bank: "Bank",
    assignee: "Assignee",
    completion: "Completion",
    username: "Username",
    password: "Password",
    incorrect_username: "Incorrect username",
    incorrect_password: "Incorrect password",
    added: "Added",
    search: "Search",
    workflowItem: "WorkflowItem",
    show_permissions: "Show Permissions",
    view: "View",
    create: "Create",
    edited: "Edited"
  },

  adminDashboard: {
    users: "Users",
    nodes: "Nodes",
    full_name: "Full Name",
    new_user: "New User",
    organization: "Organization",
    id: "Id",
    name: "Name",
    access: "Access"
  },

  login: {
    tru_budget_description: "A blockchain-based solution for budget expenditure",
    environment: "Environment",
    test_env: "Test",
    production_env: "Prod",
    accenture_tag: "Developed by Emerging Technologies & Innovation @ Accenture",
    login_button_title: "Login",
    loading: "Loading ..."
  },
  project: {
    add_new_project: "Add new project",
    project_details: "Details",
    project_name: "Name",
    project_budget: "Budget",
    project_comment: "Comment",
    project_roles: "Roles",
    project_thumbnail: "Thumbnail",
    project_title: "Project title",
    project_title_description: "Name of the project",
    project_budget_amount: "Project budget amount",
    project_budget_amount_description: "e.g.",
    project_currency: "Currency",
    project_budget_authority_role: "Select budget authority role",
    project_budget_authority_role_description: "The authority enabled to modify the budget line of the project",
    project_implementing_authority_role: "Select implementation authority role",
    project_implementing_authority_role_description:
      "The authorities enabled to create and modify subprojects, define and execute workflow activities",
    project_disbursement_authority_role: "Select disbursement authority role",
    project_disbursement_authority_role_description: "The authorities enabled to approve financial transactions",
    project_authority_organization_search: "Search organizations",
    project_authority_role_search: "Search role",
    project_permissions_title: "Set permissions for project",
    project_edit_title: "Edit Project",
    project_close_info: "Disabled as long as the Subprojects aren't closed"
  },
  subproject: {
    subproject_title: "Sub-Project title",
    subproject_title_description: "Name of the sub-project",
    subproject_budget_amount: "Sub-project  budget amount",
    subproject_budget_amount_description: "e.g.",
    subproject_comment: "Sub-project Comment",
    subproject_currency: "Sub-project Currency",
    subproject_assigned_organization: "Assigned Organization",
    subproject_add_title: "Add new Subproject",
    subproject_edit_title: "Edit Subproject",
    subproject_select_button: "Select",
    subproject_completion_string: "{0} of {1} done",
    subproject_permissions_title: "Set permissions for subproject",
    subproject_close_info: "Disabled as long as the Workflowitems aren't closed"
  },
  workflow: {
    non_approval: "Non-Approval",
    approval_required: "Approval Required",
    edit_item: "Edit Workflow item",
    add_item: "Create Workflow item",
    workflow_title: "Workflow title",
    workflow_title_description: "Name of the workflow",
    workflow_budget_amount: " Workflow budget amount",
    workflow_budget_amount_description: "Budget for the workflow",
    workflow_comment: "Workflow Comment",
    workflow_type_workflow: "Workflow",
    workflow_type_transaction: "Transaction",
    workflow_action_open_in_progress: "Pending on ",
    workflow_action_in_review: "Pending for review of",
    workflow_action_pending_approval: "Pending for approval of ",
    workflow_budget_status_na: "N/A",
    workflow_budget_status_allocated: "Assigned",
    workflow_budget_status_disbursed: "Disbursed",
    workflow_next_step: "Next step",
    workflow_no_actions: "No actions required",
    workflow_none: "None",
    workflow_enable_sort: "Sort",
    worfkfow_disable_sort: "Save",
    workflow_table_title: "Workflow items",
    workflow_type: "Type",
    workflow_documents: "Documents",
    workflow_name: "Name",
    workflow_document_name: "Document Name",
    workflow_document_description: "Add name of document",
    workflow_no_documents: "No documents",
    workflow_document_validate: "Validate",
    workflow_document_validated: "Validated",
    workflow_document_changed: "Changed",
    workflow_upload_document: "Upload",
    workflow_budget_na: "Not applicable",
    workflow_budget_allocated: "allocated",
    workflow_budget_disbursed: "disbursed",
    workflow_budget: "Workflow budget amount",
    workflow_budget_description: "e.g.",
    workflow_submit_for_review: "Submit for Review",
    workflow_permissions_title: "Set permissions for workflowitem",
    workflow_redacted: "redacted"
  },

  navigation: {
    unread_notifications: "Unread Notifications",
    peers: "Peers",
    connected_peers: "Connected Peers",
    no_peers: "No peers",
    logout: "Logout",
    read_permission: "Read",
    write_permission: "Write",
    admin_permission: "Admin",
    selections: "Selections",
    options: "Options",
    rtUpdates: "Real-Time Updates",
    other_trustees: "Other Trustees",
    menu_item_projects: "Projects",
    menu_item_notifications: "Notifications",
    menu_item_network: "Network",
    main_site: "Main",
    projects_site: "Projects",
    menu_item_users: "Users"
  },
  dashboard: {
    dashboard_title: "The Blockchain network dashboard",
    dashboard_subtitle: "Connected peers in the blockchain network",
    dashboard_card_text:
      " The connected blockchain nodes are shown in the map below. You can click on the respective markers to obtain the exact location."
  },
  notification: {
    notification_title: "Notifications",
    notification_subtitle: "Unread",
    notification_card_text:
      "Please find your current notifications below. These display action items or information items to be dealt with.",
    notification_table_project: "Project",
    notification_table_subproject: "Subproject",
    notification_table_description: "Description",
    notification_table_by: "By",
    notification_table_role: "Role",
    notification_table_all_read: "all read",
    notification_table_view: "View",
    create_workflow: "Workflow {0} created ",
    edit_workflow: "Workflow item {0} got adapted",
    create_transaction: "Transaction {0} created ",
    edit_transaction: "Transaction {0} got adapted",
    review_workflow: "You are assigned to review the workflow item {0}",
    review_transaction: "You are assigned to review the transaction {0}",
    done_workflow: "Status of workflow {0} set to Done",
    done_transaction: "Status of transaction {0} set to Done",

    subproject_assign: "Subproject {0} was assigned to you",
    project_assign: "Project {0} was assigned to you",
    workflowitem_assign: "Workflowitem {0} was assigned to you",
    no_permissions: "(No permissions to see further details)",
    subproject_close: "Subproject {0} was closed",
    workflowitem_close: "Workflowitem {0} was closed"
  },

  history: {
    edit_status: "Status of workflow item {0} changed to {1}",
    edit_currency: "Currency of workflow item {0} changed to {1} ",
    edit_amount: "Amount of workflow item {0} changed from {1} to {2} ",
    edit_comment: "Comment of workflow item {0} changed to {1} ",
    edit_addData: "Additional data of workflow item {0} changed to {1} ",
    edit_workflowName: "Name of workflow item {0} changed to {1} ",
    created_workflow: "Workflow {0} created ",
    created_project: "Project created ",
    created_subproject: "Subproject {0} created",
    edit_amountType: "Budget status of workflow item {0} changed from {1} to {2}",
    edit_documents: "Documents changed for workflow item {0}",
    edit_subproject: "Amount of {0} increased to {1}",
    first_sort: "Moved {0} to first position",
    sort: "Moved {0} after {1}",

    project_create: "{0} created project {1}",
    project_grantPermission: "{0} granted permission {1} to {2}",
    project_revokePermission: "{0} revoked permission {1} from {2}",
    project_createSubproject: "{0} created subproject {1}",
    subproject_assign: "{0} assigned project {1} to {2}",
    subproject_close: "{0} closed subproject {1}",
    subproject_grantPermission_details: "{0} granted permission {1} to {2} on {3}",
    subproject_revokePermission_details: "{0} revoked permission {1} of {3} from {2}",
    subproject_grantPermission: "{0} granted permission {1} to {2}",
    subproject_revokePermission: "{0} revoked permission {1} from {2}",
    subproject_createWorkflowitem: "{0} created workflowitem {1}",
    workflowitem_close: "{0} closed workflowitem {1}",
    workflowitem_grantPermission: "{0} granted permission {1} to {2} on {3}",
    workflowitem_revokePermission: "{0} revoked permission {1} of {3} from {2}",
    workflowitem_assign: "{0} assigned workflowitem {1} to {2}",
    changed_by: "{0} changed by {1}: ",
    to: "{0} to {1}"
  },

  permissions: {
    read_only: "Read-only permissions",
    view: "View permissions",
    write: "Write permissions",
    admin: "Admin permissions",
    project_assign: "Assign project to others",
    project_intent_grantPermission: "Grant permissions",
    project_intent_listPermissions: "View permissions",
    project_intent_revokePermission: "Revoke permissions",
    project_viewDetails: "View project details",
    project_viewSummary: "View project in overview",
    project_close: "Close project",
    project_createSubproject: "Create subprojects",
    subproject_archive: "Archive subproject",
    subproject_assign: "Assign subproject",
    subproject_close: "Close subproject",
    subproject_createWorkflowitem: "Create workflow items",
    subproject_intent_grantPermission: "Grant subproject permissions",
    subproject_intent_listPermissions: "View subproject permissions",
    subproject_intent_revokePermission: "Revoke subproject permissions",
    subproject_update: "Update subproject",
    subproject_viewDetails: "View subproject details",
    subproject_viewSummary: "View subproject overview",
    workflowitem_intent_listPermissions: "Show workflowitem permissions",
    workflowitem_intent_grantPermission: "Grant workflowitem permission",
    workflowitem_intent_revokePermission: "Revoke workflowitem permission",
    workflowitem_view: "View workflowitem",
    workflowitem_assign: "Assign workflowitem",
    workflowitem_update: "Update workflowitem",
    workflowitem_close: "Close workflowitem",
    workflowitem_archive: "Archive workflowitem"
  },
  language: {
    german: "German",
    french: "Français",
    english: "English",
    portuguese: "Portuguese"
  }
};
export default en;
