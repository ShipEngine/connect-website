import * as Connect from "../../";

export function testEnumerations() {
  let size = Connect.DocumentSize.Inches4x6;
  let status = Connect.ShipmentStatus.Accepted;
  let unit = Connect.WeightUnit.Kilograms;
  let country = Connect.Country.Australia;
}

export function testErrorClasses() {
  let notFound = new Connect.NotFoundError("not found");
  let badRequest = new Connect.BadRequestError("bad request");
  let unauthorizied = new Connect.UnauthorizedError("unauthorized");
  let external = new Connect.ExternalServiceError("external error");
}

export function testInterfaces() {
  let shipment: Connect.ShipmentConfirmation = {
    trackingNumber: "12345",
    label: {
      format: Connect.DocumentFormat.PDF,
      size: Connect.DocumentSize.A4,
      type: Connect.DocumentType.Label,
      data: Buffer.alloc(0),
    },
    packages: [],
    charges: []
  };

  let tracking: Connect.TrackingInfo = {
    trackingNumber: "12345",
    packages: [],
    events: [{
      status: Connect.ShipmentStatus.Delivered,
      dateTime: new Date(),
      code: "DELIV"
    }],
  };
}
