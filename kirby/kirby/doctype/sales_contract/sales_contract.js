// Copyright (c) 2022, Amafhh Infotech and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Sales Contract', {
// 	// refresh: function(frm) {

// 	// }
// });


frappe.ui.form.on("Sales Contract", {
    supplier: function(frm) {
      frappe.db.get_list('Dynamic Link',{ 
        fields:['parent'], 
        filters:{ 
            'link_doctype':"Company",
            'link_name': cur_frm.doc.supplier
        } 
        }).then(function(doc){ 
            // console.log(doc); 
            cur_frm.set_value("supplier_primary_contact",doc[0].parent); 
        });
       
    } 
});


frappe.ui.form.on("Sales Contract", {
    supplier_primary_contact: function(frm) {
    if(cur_frm.doc.supplier_primary_contact){
      frappe.db.get_list('Address',{ 
        fields:['phone','email_id','address_line1','city','state','country'], 
        filters:{ 
            'name': cur_frm.doc.supplier_primary_contact
        } 
        }).then(function(doc){ 
           
            // console.log(doc[0].address_line1+','+doc[0].city+','+doc[0].state+','+doc[0].country); 
            cur_frm.set_value("supplier_mobile_no",doc[0].phone); 
            cur_frm.set_value("supplier_email_id",doc[0].email_id);
            cur_frm.set_value("supplier_primary_address",doc[0].address_line1+','+doc[0].city+','+doc[0].state+','+doc[0].country);
            
        });
        }
    } 
});

frappe.ui.form.on('Sales Contract Items', {
	item_code: function(frm, cdt, cdn){
	    var d = locals[cdt][cdn];
        frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Item Price",
					fields: ['price_list_rate'],
					filters: [["item_code", "=", d.item_code]]
				},
				async: false,
				callback: function(r) {
				    console.log(r);
			        frappe.model.set_value(d.doctype, d.name, 'rate', r.message[0].price_list_rate);
			        frappe.model.set_value(d.doctype, d.name, 'amount', r.message[0].price_list_rate);
				}
			});
	},
	quantity: function(frm, cdt, cdn){
	    var d = locals[cdt][cdn];
        frappe.model.set_value(d.doctype, d.name, 'amount', d.rate * d.quantity);
	},
	
	rate: function(frm, cdt, cdn){
	    var d = locals[cdt][cdn];
        frappe.model.set_value(d.doctype, d.name, 'amount', d.rate * d.quantity);
	},
	
	
});


frappe.ui.form.on('Sales Contract Items', {
	item_code: function(frm, cdt, cdn){
	    var d = locals[cdt][cdn];
        frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Comodity item",
					fields: ['amount'],
					filters: [["parent", "=", d.comodity_type]],
					parent: "Comodity",
					limit_page_length: 1000
				},
				async: false,
				callback: function(r) {
				    console.log(r.message);
			        frappe.model.set_value(d.doctype, d.name, 'comodity_rate', r.message[0].amount);
				}
			});
	}
});

// //Comodity Type Wise Rate get in comodity doctype
// frappe.ui.form.on('Sales Contract Items', {
// 	item_code: function(frm, cdt, cdn){
// 	    var d = locals[cdt][cdn];
//         frappe.call({
// 				method: "frappe.client.get_list",
// 				args: {
// 					doctype: "Comodity item",
// 					fields: ['amount'],
// 					filters: [["parent", "=", d.comodity_type]],
// 					parent: "Comodity",
// 					limit_page_length: 1000
// 				},
// 				async: false,
// 				callback: function(r) {
// 				    console.log(r.message);
// 			        frappe.model.set_value(d.doctype, d.name, 'rate', r.message[0].amount);
// 			        frappe.model.set_value(d.doctype, d.name, 'amount', r.message[0].amount);
// 				}
// 			});
// 	},
	
// 	quantity: function(frm, cdt, cdn){
// 	    var d = locals[cdt][cdn];
//         frappe.model.set_value(d.doctype, d.name, 'amount', d.rate * d.quantity);
// 	},
	
// 	rate: function(frm, cdt, cdn){
// 	    var d = locals[cdt][cdn];
//         frappe.model.set_value(d.doctype, d.name, 'amount', d.rate * d.quantity);
// 	},
	
// });


// frappe.ui.form.on("Sales Contract", "supplier", function(frm) {
//     if(cur_frm.doc.supplier){
//             frappe.call({
//                 method: "frappe.client.get",
//                 args: {
//                     doctype: "Dynamic Link",
//                     filters: {"link_doctype": "Company",}
//                 },
//                 callback: function(r) {
//                     console.log(r);
//                     // if (r.message) {
//                     //     frm.set_value('supplier_mobile_no',r.message.phone_no);
//                     // }
//                 }
//             });
//     }
// });