import frappe
import requests
import string

@frappe.whitelist(allow_guest=True)
def fetch_data():
    url = "https://metals-api.com/api/latest?access_key=m890gmsvo9wbp7yx2xvqsd0oj7elu2z62qw1lkw4m5380jk57703bodbthx6&base=USD&symbols=ALU%2CLME-ALU%2CLME-XCU%2CLME-ZNC%2CLME-NI%2CLME-LEAD%2CLME-TIN%2CINR"
    resp = requests.get(url)
    test = resp.json()
    stagging = frappe.new_doc("Comodity Stagging")
    stagging.timestamp = test['timestamp']
    stagging.date = test['date']
    stagging.base = test['base']
    for k,v in test['rates'].items():
        if k == "INR" or k == "USD":

            stagging.append("rates",{
                                        'code':k,
                                        'amount':v
                                    })
            stagging.save()
        else:
            stagging.append("rates",{
                                        'code':k,
                                        'amount': 1 / v * 16
                                    })
            stagging.save()