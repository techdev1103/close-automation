export type ITask = {
  assignedTo: string;
  assignedToName: string;
  contactId?: string;
  contactName?: string;
  createdBy: string;
  createdByName: string;
  date: string;
  dateCreated: string;
  dateUpdated: string;
  deduplicationKey: string;
  dueDate: string;
  id: string;
  isComplete: boolean;
  isDateLess: boolean;
  isPrimiaryLeadNotification: boolean;
  leadId: string;
  leadName: string;
  objectId?: string;
  objectType: string;
  organizationId: string;
  text: string;
  updatedBy: string;
  updatedByName: string;
  view: string;
  type: string;
};

// {
//     "_type": "lead",
//     "assigned_to": "user_DaAiQPbGOmnJa8MqI9o8nXHzUh0Le27oBXZRAbPKaBz",
//     "assigned_to_name": "Kenneth Jones",
//     "contact_id": null,
//     "contact_name": null,
//     "created_by": "user_DaAiQPbGOmnJa8MqI9o8nXHzUh0Le27oBXZRAbPKaBz",
//     "created_by_name": "Kenneth Jones",
//     "date": "2013-02-06",
//     "date_created": "2025-03-15T07:31:44.796000+00:00",
//     "date_updated": "2025-03-15T07:31:44.796000+00:00",
//     "deduplication_key": null,
//     "due_date": "2013-02-06",
//     "id": "task_sgX6kHLnE35xsIecD4rQGFDouP7dUQbkF4S3qr0bBk8",
//     "is_complete": false,
//     "is_dateless": false,
//     "is_primary_lead_notification": true,
//     "lead_id": "lead_nkxueBaaGHgGjPdq5GJi07AJFfiKoIlY62HXzRMgSBc",
//     "lead_name": "Ruzanna Tantushyan",
//     "object_id": null,
//     "object_type": null,
//     "organization_id": "orga_KmflgsnoUXfouTeX8dnR4USRUTiJTHmvTIKJGlqYoNx",
//     "text": "Connect with Account Manager",
//     "updated_by": "user_DaAiQPbGOmnJa8MqI9o8nXHzUh0Le27oBXZRAbPKaBz",
//     "updated_by_name": "Kenneth Jones",
//     "view": "inbox"
// }
