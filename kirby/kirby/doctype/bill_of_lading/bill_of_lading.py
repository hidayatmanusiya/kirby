# Copyright (c) 2022, Amafhh Infotech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class BillofLading(Document):
	pass
 
@frappe.whitelist()
def get_container(container):
    con = frappe.db.sql(f""" select c.name,ci.pallet,ci.item_code,c.seal_number,c.total_pallet_tare,c.total_weight,c.total_net_weight,ci.idx from `tabContainer` c left join `tabContainer Item` ci on ci.parent=c.name where c.name='{container}' """,as_dict=1)
    return con

