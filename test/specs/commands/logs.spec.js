const { expect } = require("chai");
const { parseLogs } = require("../../../lib/commands/logs");

const sampleLogs = `"\n> dx-shipping-runtime@1.0.0 start /code\n> node dist/server.js\n\n{\"level\":\"info\",\"message\":\"Logging initialized with info level and json\",\"metadata\":{\"timestamp\":\"2020-10-27T16:20:59.434Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"loading app from app\",\"metadata\":{\"timestamp\":\"2020-10-27T16:21:00.831Z\"},\"transactionId\":\"no-txid\"}\nentering startup config...\nstartup complete\n{\"level\":\"info\",\"message\":\"Successfully loaded @shipstation/my-app v0.0.1\",\"metadata\":{\"timestamp\":\"2020-10-27T16:21:01.126Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"This is a carrier app that uses v10.1 of the SDK\",\"metadata\":{\"timestamp\":\"2020-10-27T16:21:01.126Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"Environment Variables\\n----------------------\\nNODE_ENV: production\\nSENTRY_DSN: \\nPORT: 80\\nHOST: k8s\\nNEW_RELIC_APP_NAME: dip-@shipstation/my-app [k8s],dx-carrier-runtime\\nLOG_LEVEL: info\\n----------------------\",\"metadata\":{\"timestamp\":\"2020-10-27T16:21:01.126Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"NewRelic agent enabled: true. AppName: dip-@shipstation/my-app [k8s],dx-carrier-runtime\",\"metadata\":{\"timestamp\":\"2020-10-27T16:21:01.216Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"Server started on port 80\",\"metadata\":{\"timestamp\":\"2020-10-27T16:21:02.817Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"HTTP GET /manifest\",\"metadata\":{\"meta\":{\"request\":{},\"response\":{\"body\":{\"name\":\"@shipstation/my-app\",\"description\":\"iPaaS team test carrier\",\"version\":\"0.0.1\",\"author\":\"\",\"dependencies\":{\"jspdf\":\"^2.1.1\"},\"devDependencies\":{\"@shipengine/connect\":\"^1.0.10\",\"@types/node\":\"^13.13.23\",\"copyfiles\":\"^2.4.0\",\"typescript\":\"^4.0.3\"},\"engines\":{\"node\":\">=12.8.0\"},\"keywords\":[\"ShipEngine\",\"carrier app\"],\"main\":\"lib/index.js\",\"private\":true,\"scripts\":{\"build\":\"tsc\",\"postbuild\":\"copyfiles -u 1 src/**/!\\\\(*.ts\\\\) lib; copyfiles -u 1 src/!\\\\(*.ts\\\\) lib\",\"start\":\"connect start\",\"test\":\"connect test\",\"watch\":\"tsc --watch\"},\"bundledDependencies\":[\"jspdf\"]}},\"responseTime\":73},\"timestamp\":\"2020-10-27T17:16:44.230Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"HTTP GET /getregistrydata\",\"metadata\":{\"meta\":{\"request\":{},\"response\":{\"body\":{\"Id\":\"\",\"Name\":\"@shipstation/my-app\",\"Carriers\":[{\"Id\":\"d7ed8ecf-130e-4f17-839f-2a2d10f39257\",\"Name\":\"@shipstation/my-app\",\"ShippingOptions\":[],\"AccountModals\":{\"RegistrationFormSchema\":{\"formSchema\":{\"jsonSchema\":{\"title\":\"Login Form Example\",\"description\":\"Connect to your account.\",\"type\":\"object\",\"required\":[\"email\",\"password\"],\"properties\":{\"email\":{\"title\":\"Email Address\",\"type\":\"string\",\"format\":\"email\"},\"password\":{\"title\":\"Password\",\"type\":\"string\",\"minLength\":8}}},\"uiSchema\":\"{\\\"email\\\":{\\\"ui:autofocus\\\":true,\\\"ui:emptyValue\\\":\\\"you@example.com\\\"},\\\"password\\\":{\\\"ui:widget\\\":\\\"password\\\",\\\"ui:help\\\":\\\"Note: password is case sensitive\\\"}}\"}},\"SettingsFormSchema\":{\"formSchema\":{\"jsonSchema\":{\"title\":\"Settings Form Example\",\"description\":\"Change your account.\",\"type\":\"object\",\"required\":[\"email\",\"password\"],\"properties\":{\"email\":{\"title\":\"Email Address\",\"type\":\"string\",\"format\":\"email\"},\"password\":{\"title\":\"Password\",\"type\":\"string\",\"minLength\":8}}},\"uiSchema\":\"{\\\"email\\\":{\\\"ui:autofocus\\\":true,\\\"ui:emptyValue\\\":\\\"you@example.com\\\"},\\\"password\\\":{\\\"ui:widget\\\":\\\"password\\\",\\\"ui:help\\\":\\\"Note: password is case sensitive\\\"}}\"}}},\"CarrierAttributes\":[\"ManifestDigital\"],\"CarrierUrl\":\"http://www.carier-site.com/\",\"ShippingServices\":[{\"Id\":\"79982a04-b40a-42b5-b7ac-322d229d6540\",\"Name\":\"Example Delivery Service\",\"Abbreviation\":\"Exam\",\"SupportedCountries\":[{\"FromCountry\":\"US\"}],\"Code\":\"eds\",\"ServiceAttributes\":[],\"SupportedLabelSizes\":[\"Inches4x8\",\"Inches4x6\",\"Inches4x8\"],\"Class\":\"Unspecified\",\"Grade\":\"Unspecified\",\"ConfirmationTypes\":[{\"Name\":\"Example Delivery Confirmation\",\"Type\":\"Delivery\"},{\"Name\":\"No Confirmation Required\",\"Type\":\"None\"}],\"International\":false,\"RequiredProperties\":[\"Weight\",\"Dimensions\"]}],\"PackageTypes\":[{\"Abbreviation\":\"Box\",\"Id\":\"e3324a1d-7a6c-4234-a708-ba47868ac04f\",\"Name\":\"Box\",\"CarrierPackageTypeCode\":\"e3324a1d-7a6c-4234-a708-ba47868ac04f\",\"Description\":\"Your own box. Cannot be longer than 36 inches or weigh more than 150 pounds\",\"PackageAttributes\":[\"Domestic\"],\"RequiredToShip\":[\"Dimensions\",\"Weight\"]}],\"LabelFormats\":[\"PDF\"],\"DefaultLabelSizes\":[\"Inches4x8\",\"Inches4x6\",\"Inches4x8\"]}],\"Connector\":{\"ApiVersion\":\"1.0\",\"ConnectorUrl\":\"https://nothing.sslocal.com\",\"Functions\":[{\"Name\":\"CreateLabel\",\"IsSandboxed\":false},{\"Name\":\"GetRates\",\"IsSandboxed\":false},{\"Name\":\"Register\",\"IsSandboxed\":false},{\"Name\":\"Track\",\"IsSandboxed\":false}],\"DiagnosticRoutes\":{\"Liveness\":\"diagnostics/liveness\",\"Readiness\":\"diagnostics/readiness\",\"Version\":\"diagnostics/version\"}}}},\"responseTime\":7},\"timestamp\":\"2020-10-27T17:16:44.321Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"HTTP GET /logo\",\"metadata\":{\"meta\":{\"request\":{},\"responseTime\":76},\"timestamp\":\"2020-10-27T17:16:44.411Z\"},\"transactionId\":\"no-txid\"}\n{\"level\":\"info\",\"message\":\"HTTP GET /icon\",\"metadata\":{\"meta\":{\"request\":{},\"responseTime\":1},\"timestamp\":\"2020-10-27T17:16:44.635Z\"},\"transactionId\":\"no-txid\"}\n"`;

describe("When parsing logs", () => {

  it("should successfully parse all logs", () => {
    const parsedLogs = parseLogs(sampleLogs, "1500");
    expect(parsedLogs.length).to.equal(18);
    expect(parsedLogs[1]).to.include("> dx-shipping-runtime@1.0.0 start /code");
    expect(parsedLogs[4]).to.include("Logging initialized with info level and json");
  });

  it("should parse a simple string", () => {
    const parsedLogs = parseLogs("Simple log statement", "1500");
    expect(parsedLogs.length).to.equal(1);
    expect(parsedLogs[0]).to.include("Simple log statement");
  });

  it("should parse a json log", () => {
    const jsonLog = "{\"level\":\"info\",\"message\":\"Logging initialized with info level and json\",\"metadata\":{\"timestamp\":\"2020-10-27T16:20:59.434Z\"},\"transactionId\":\"no-txid\"}";
    const parsedLogs = parseLogs(jsonLog, "1500");
    expect(parsedLogs.length).to.equal(1);
    expect(parsedLogs[0]).to.include("message=");
    expect(parsedLogs[0]).to.include("Logging initialized with info level and json");
  });

  it("should parse a log with timestamp metadata", () => {
    const jsonLog = "{\"level\":\"info\",\"message\":\"Logging initialized with info level and json\",\"metadata\":{\"timestamp\":\"2020-10-27T16:20:59.434Z\"},\"transactionId\":\"no-txid\"}";
    const parsedLogs = parseLogs(jsonLog, "1500");
    expect(parsedLogs.length).to.equal(1);
    expect(parsedLogs[0]).to.include("2020-10-27T16:20:59.434Z");
  });

  it("should parse a log with transaction id metadata", () => {
    const jsonLog = "{\"level\":\"info\",\"message\":\"Logging initialized with info level and json\",\"metadata\":{\"timestamp\":\"2020-10-27T16:20:59.434Z\"},\"transactionId\":\"12345\"}";
    const parsedLogs = parseLogs(jsonLog, "1500");
    expect(parsedLogs.length).to.equal(1);
    expect(parsedLogs[0]).to.include("transactionId=12345");
  });

  it("should parse a log that contains HTTP metadata", () => {
    const parsedLogs = parseLogs(sampleLogs, "1500");
    expect(parsedLogs[14]).to.include('"request":{}');
    expect(parsedLogs[14]).to.include('"response":{"body":');
  });


  it("should output any unknown metadata key value pairs in the ", () => {
    const jsonLog = "{\"level\":\"info\",\"message\":\"Logging initialized with info level and json\",\"metadata\":{\"timestamp\":\"2020-10-27T16:20:59.434Z\", \"foo\": \"bar\"},\"transactionId\":\"no-txid\"}";
    const parsedLogs = parseLogs(jsonLog, "1500");

    expect(parsedLogs[0]).to.include("bar");
  });

  it("should only return the number of lines specified by the flag", () => {
    const parsedLogs = parseLogs(sampleLogs, "2");
    expect(parsedLogs.length).to.equal(2);
    expect(parsedLogs[1]).to.include("> dx-shipping-runtime@1.0.0 start /code");
  });
});
