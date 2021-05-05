module.exports.ConnectionFormSchema = {
    JsonSchema: {
        "type": "object",
        "required": [
            "username",
            "password"
        ],
        "properties": {
            "username": {
                "type": "string",
                "title": "User Name:"
            },
            "password": {
                "type": "string",
                "title": "Password:"
            }
        }
    },
    UiSchema: {
        "password": {
            "ui:widget": "password",
            "ui:help": "Hint: Make it strong!"
        }
    }
};
