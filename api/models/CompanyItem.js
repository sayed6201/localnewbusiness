import mongoose from 'mongoose';

const CompanyItemSchema = new mongoose.Schema(
    {
        company_name: {
            type: String
        },
        company_number: {
            type: String
        },
        company_status: {
            type: String
        },
        company_type: {
            type: String
        },
        kind: {
            type: String
        },
        links: {
            company_profile: {
                type: String
            }
        },
        date_of_creation: {
            type: Date
        },
        registered_office_address: {
            address_line_1: {
                type: String
            },
            locality: {
                type: String
            },
            postal_code: {
                type: String
            },
            country: {
                type: String
            }
        },
        sic_codes: {
            type: [
                String
            ]
        }
    }
);

export default mongoose.model("CompanyItem", CompanyItemSchema)