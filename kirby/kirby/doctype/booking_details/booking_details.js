// Copyright (c) 2022, Amafhh Infotech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Booking Details', {
	// refresh: function(frm) {

	// }
	setup: function (frm) {
        frm.set_query('booking_agent', function (doc) {
            return {
                filters: {
                    'supplier_group': "Shipping"
                }
            };
        });
    }
});

