import { OrderApp, OAuthRequest, OAuthResponse } from "@shipengine/connect-sdk/lib/internal";
import { OAuthParameterDefinition } from "@shipengine/connect-sdk";

export function mapOAuthParameters(params: readonly OAuthParameterDefinition[] | undefined) {
  if (!params) {
    return [];
  }

  return params.map((param) => {
    return {
      Name: param.name,
      Value: param.value,
      Encoding: param.encoding,
    };
  });
}

export function mapOAuthRequest(req: OAuthRequest | undefined) {
  if (!req) {
    return undefined;
  }

  return {
    Method: req.method,
    Url: req.url,
    ContentType: req.contentType,
    Headers: mapOAuthParameters(req.headerParameters),
    QueryParameters: mapOAuthParameters(req.queryParameters),
    Body: mapOAuthParameters(req.bodyParameters),
  };
}

export function mapOAuthResponse(res: OAuthResponse | undefined) {
  if (!res) {
    return undefined;
  }

  return {
    Headers: mapOAuthParameters(res.headerParameters),
    QueryParameters: mapOAuthParameters(res.queryParameters),
    Body: mapOAuthParameters(res.bodyParameters),
  };
}

export function detectBasicAuth(app: OrderApp): boolean {
  const formFields = Object.keys(app.connectionForm.dataSchema.properties ?? {});

  return formFields.includes("username");
}

export function mapAuthProcess(app: OrderApp) {
  if (!app.oauthConfig) {
    return {
      Identifier: {
        AuthenticationType: detectBasicAuth(app) ? "basic" : "apikey",
        IsSandbox: false,
      },
    };
  }

  const TokenProperties = app.oauthConfig.tokenProperties
    ? {
        AccessTokenExpirationLength: app.oauthConfig.tokenProperties?.accessTokenExpirationLength?.toString(),
        RefreshTokenExpirationLength: app.oauthConfig.tokenProperties?.refreshTokenExpirationLength?.toString(),
        TokenExpirationLengthTimeUnit:
          app.oauthConfig.tokenProperties.tokenExpirationLengthTimeUnit,
      }
    : undefined;

  const AuthorizationProcess = {
    AcceptRequest: mapOAuthRequest(app.oauthConfig.authorizationProcess.loginRequest),
    // The name of this is request, but the type is response?
    RedirectRequest: mapOAuthResponse(app.oauthConfig.authorizationProcess.redirectRequest),
    AuthorizeRequest: mapOAuthRequest(app.oauthConfig.authorizationProcess.authorizeRequest),
    AuthorizeResponse: mapOAuthResponse(app.oauthConfig.authorizationProcess.authorizeResponse),
  };

  const RefreshTokenProcess = app.oauthConfig.refreshTokenProcess
    ? {
        RefreshTokenRequest: mapOAuthRequest(
          app.oauthConfig.refreshTokenProcess.refreshTokenRequest
        ),
        RefreshTokenResponse: mapOAuthResponse(
          app.oauthConfig.refreshTokenProcess.refreshTokenResponse
        ),
      }
    : {};

  return {
    Identifier: {
      AuthenticationType: "oauth",
      IsSandbox: false,
    },
    TokenProperties,
    AuthorizationProcess,
    RefreshTokenProcess,
  };
}

export function mapFunctions(app: OrderApp) {
  const functions = [];

  if (app.getSalesOrdersByDate) {
    functions.push({
      Name: "SalesOrdersExport",
      IsSandboxed: false,
    });
  }

  if (app.shipmentCreated) {
    functions.push({
      Name: "ShipmentNotification",
      IsSandboxed: false,
    });
  }

  if (app.acknowledgeOrders) {
    functions.push({
      Name: "AcknowledgeOrders",
      IsSandboxed: false,
    });
  }

  return functions;
}

// TODO We should add types for the OAuth metadata to the OrderSource library
export function mapMetadata(app: OrderApp): any {
  return {
    Name: app.name,
    AuthProcess: mapAuthProcess(app),
    OrderSources: [
      {
        Id: app.id,
        Name: app.name,
        SendEmail: true,
        HasCustomMappings: false,
        CanRefresh: true,
        CanLeaveFeedback: false,
        ScoreFactorForAutoRefresh: 0,
        CanConfirmShipments: true,
        CanConfirmMultipleShipments: true,
        IsRefreshDisabled: false,
        HasCustomStatuses: false,
        CanConfigureTimeZone: true,
        HasInventoryLevels: false,
        AccountConnection: {
          ConnectionFormSchema: {
            Name: app.name,
            Logos: [],
            JsonSchema: app.connectionForm.dataSchema,
            UiSchema: app.connectionForm.uiSchema,
          },
        },
      },
    ],
    Connector: {
      ExternallyHosted: "false",
      DiagnosticRoutes: {
        Liveness: "/diagnostics/liveness",
        Readiness: "/diagnostics/readiness",
        Version: "/diagnostics/version",
      },
      ApiVersion: "2.0.0",
      Functions: mapFunctions(app),
      HasSandbox: false,
      IsHostedExternally: false,
    },
  };
}
