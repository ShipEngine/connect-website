const data = [
  {
    status: "COMPLETE",
    code: "AC",
    description: "Cancellation is complete.",
    note: ""
  },
  {
    status: "FAILED",
    code: "FA",
    description: "Cancellation failed.",
    note: "Please call ###-###-### to cancel."
  }
]


export interface VoidLabelsRequest {
  operation: "void_labels";
  session_id: string;
  cancellations: {
    cancellationID: string;
    internalReferenceID: string;
    trackingNumber: string;
  }[]
};

export interface VoidLabelsResponse {
  canceledShipments: VoidLabelsResponseItem[];
}

export interface VoidLabelsResponseItem {
  id: string;
  cancellationStatus: string;
  cancellationCode: string;
  cancellationDescription: string;
  cancellationNote: string;
  cancellationConfirmation: string;
}

/**
 * This is a mock implementation of a carrier"s API that voids one or more labels
 */
export function voidLabels(request: VoidLabelsRequest): VoidLabelsResponse {
  return {
    canceledShipments: request.cancellations.map((cancellation) => {
      const { cancellationID } = cancellation;
      const { status, code, description, note } = data[Math.floor(Math.random() * data.length)];

      return {
        id: cancellationID,
        cancellationStatus: status,
        cancellationCode: code,
        cancellationDescription: description,
        cancellationNote: note,
        cancellationConfirmation: Buffer.from(new Date().toISOString()).toString(
          "base64"
        ),
      };
    })
  }
}
