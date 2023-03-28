# Copyright (c) 2022, Amafhh Infotech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Container(Document):
    # pass
    
    def before_submit(self):
        
        booking_number = frappe.get_doc('Booking Details',self.booking_number)
        book_no = str(booking_number.name)
        
        sum = frappe.db.sql(f"""select sum(container_tare_weight+total_net_weight) from `tabContainer` where name='{self.name}'""",as_dict=1)
        sum = str(sum)
        sum = sum.replace("[", "")
        sum = sum.replace("]", "")
        sum = sum.replace("{", "")
        sum = sum.replace("}", "")
        sum = sum.replace("'", "")
        sum = sum.replace("sum", "")
        sum = sum.replace("(", "")
        sum = sum.replace("):", "")
        sum = sum.replace("container_tare_weight+total_net_weight", "")
        sum = sum.replace(".0", "")

        if book_no:
            booking_entry_child = booking_number.append('containers',{})
            booking_entry_child.container_number = self.name
            booking_entry_child.container_size = self.container_size
            booking_entry_child.seal_number = self.seal_number
            booking_entry_child.date_in = self.get_in
            booking_entry_child.location = "India"
            booking_entry_child.count = "1"
            booking_entry_child.tare_weight = self.container_tare_weight
            booking_entry_child.cargo_weight = self.total_net_weight
            booking_entry_child.total_weight = sum
            booking_number.save()
            frappe.msgprint("Add Containers In Booking Child Table")
        else:
            frappe.msgprint("Booking Number Not Match Or Null")