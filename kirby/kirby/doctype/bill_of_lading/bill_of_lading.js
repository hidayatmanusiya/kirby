// Copyright (c) 2022, Amafhh Infotech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bill of Lading', {
    booking_number: function(frm) {
        frm.set_query("container", function() {
            return {
                filters: {
                    'booking_number': cur_frm.doc.booking_number,
                    // 'bill_of_lading': 0
                }
            }
        });
    }
});

frappe.ui.form.on('Bill of Lading', {
  container: function(frm){
    frappe.call({
     method: 'kirby.kirby.doctype.bill_of_lading.bill_of_lading.get_container',
     args: {container: cur_frm.doc.container}
    }).done((r) => {
        console.log(r);
        $.each(r.message, function(_i, e){
        let entry = frm.add_child("items");
        entry.item_code = e.item_code;
        entry.container_number = e.name;
        entry.container_seal_number = e.seal_number;
        entry.no_of_bales = e.idx;
        entry.tare = e.total_pallet_tare;
        entry.gross_in_pounds = e.total_weight;
        entry.net_in_pounds = e.total_net_weight;
        });
        refresh_field("items");

  });
 }
});

frappe.ui.form.on('Bill of Lading', {
   container:function(frm){
        var bol = "1";
        frappe.call({
            "method": "frappe.client.set_value",
            "args": {
                "doctype": "Container",
                "name": cur_frm.doc.container,
                "fieldname": "bill_of_lading",
                "value": bol,
            }
        });
        }
});

frappe.ui.form.on('Bill of Lading Item', {        
    before_items_remove:function(frm, cdt, cdn){
        var d = locals[cdt][cdn];
        var bol = "0";
        frappe.call({
            "method": "frappe.client.set_value",
            "args": {
                "doctype": "Container",
                "name": d.container_number,
                "fieldname": "bill_of_lading",
                "value": bol,
            }
        });
        }
});