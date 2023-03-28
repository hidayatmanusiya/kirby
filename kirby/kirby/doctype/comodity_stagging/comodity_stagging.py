# Copyright (c) 2022, Amafhh Infotech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ComodityStagging(Document):
	pass
# 	def validate(self):
# 		check_comodity(self)
# 		insert_data_comodity(self)	


# def check_comodity(self):
# 	for i in self.rates:
# 		comodity_list = frappe.get_list('Comodity', fields=['comodity'])
# 		check = {'comodity': i.code}
# 		if check not in comodity_list:
# 			comodity = frappe.get_doc({
# 				"doctype": "Comodity",
# 				"comodity": i.code
# 			})
# 			comodity.insert(ignore_permissions = True)


# def insert_data_comodity(self):
# 	for i in self.rates:
# 		como = frappe.get_doc('Comodity',i.code)
# 		como_entry_child = como.append('items',{})
# 		como_entry_child.comodity_name = i.code,
# 		como_entry_child.comodity_symbol = i.code,
# 		como_entry_child.amount = i.amount,
# 		como_entry_child.date = self.date,
# 		como_entry_child.insert(ignore_permissions = True)