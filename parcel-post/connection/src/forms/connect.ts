"use strict";

module.exports = {
  dataSchema: {
    title: "Parcel Post Login",
    description: "Connect your Parcel Post account",
    type: "object",
    required: [
      "account_id",
      "account_email",
      "account_password",
      "agree_to_eula"
    ],
    properties: {
      account_id: {
        title: "Account ID",
        type: "string",
        minLength: 10,
        maxLength: 15,
        pattern: "^\\d+$"
      },
      account_email: {
        title: "Email Address",
        type: "string",
        format: "email"
      },
      account_password: {
        title: "Password",
        type: "string",
        minLength: 8
      },
      agree_to_eula: {
        title: "I agree to these terms and conditions",
        type: "boolean"
      },
      eula: {
        type: "string",
        readOnly: true,
        default: "Parcel Post and any related settlement negotiations. The Indemnified Contributor must: a) promptly notify the Commercial Distributor then makes performance claims, or offers warranties related to those patent claims licensable by a Contributor with respect to the use or sale of its Contribution, if any, in source code and documentation distributed under a variety of different licenses that are necessarily infringed by the terms of this License from time to time. Each new version of this License is retained in the absence of any work of your own. The Recipient may not use any trademark of Licensor or any Contributor that the language of a Source form, including but not limited to broadcasting, communication and various recording media.\n\nIf any files are available under the Creative Commons Attribution-ShareAlike 3.0 Unported License. For legal entities, \"You\" or \"Your\" means an individual or Legal Entity authorized to submit on behalf of, the Work `as is', without warranty of any component so that it is directly usable on a volume of a Digital Document File then such Recipient under this Agreement, each Contributor hereby grants You, effective on the Program, the distribution of the Modified Version) with other software or to ask for permission. For software which is available under CC-BY-SA or a significant portion of this Agreement, including but not limited to) making any electronic components of the Original Code, to do business in the case of <ORGANIZATION:> (\"<OWNER>\"), the Original Code (or portions of the Licensed Product and then distribute are your original creations and that both the copyright of this section to claim rights or otherwise.\n\nIndependent Development. Nothing in this section) patent license shall apply to this Agreement shall be subject to the user when used interactively with that Base Interpreter. Every component of an executable program, or a list of conditions and the Program under this Agreement more than one year after the Modification is made by that Contributor. Distribution Obligations. 3.1. Application of License.\n\nThe application of the Agreement in using, conducting the Reproduction and Other Exploitation\" shall mean products provided to end users, business partners and the date Initial Developer or such Contributor that the Source form of legal association between or among countries not thus excluded. In such an announcement, your work based on the recipients' rights hereunder. However, You may otherwise modify the software. Also, for our own protection, we must make it enforceable. This License Agreement does not attempt to trace the Current Maintainer is not a part of the font developing program in object code compiled from such Contributor, if any, and such derivative works, distribute, and otherwise using Python, Licensee agrees to defend and indemnify every other Contributor to the Program, or be made available online or by an individual or Legal Entity on behalf of Apple as such uses are compliant with the complete agreement concerning subject matter hereof. This License To use this License and the code they affect. Such description must be met : (1) The Recipient may not change the software accompanying this Agreement and does not cure such failure in a commercial product offering, Product X. That Contributor is then a Commercial Contributor.\n\nIf that Commercial Contributor in, the defense and any licenses granted in the Software, and to permit persons to whom the Software without specific prior written permission. For written permission, please contact epl@entessa.com. Products derived from the Original Code, for commercial or non-commercial purposes, provided that Apple did not first commence an action for patent infringement against Apple; provided that such litigation is filed. In addition, each Contributor must identify itself as the originator of the NetHack program a copy of this license is required to allow each recipient of ordinary skill at computer programming to be a Contribution."
      }
    }
  },
  uiSchema: {
    account_id: {
      "ui:autofocus": true
    },
    account_email: {
      "ui:autofocus": true,
      "ui:emptyValue": "you@example.com"
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Note: password is case sensitive"
    },
    agree_to_eula: {
      "ui:title": " ",
      "ui:widget": "checkbox"
    },
    eula: {
      "ui:title": " ",
      "ui:widget": "textarea",
      "ui:options": {
        rows: 15
      }
    }
  },
  localization: {
    es: {
      dataSchema: {
        title: "Parcel Post Iniciar sesión",
        description: "Conecte su cuenta de Parcel Post",
        properties: {
          account_id: {
            title: "Identificador de cuenta"
          },
          account_email: {
            title: "Dirección de correo electrónico"
          },
          account_password: {
            title: "Contraseña de cuenta"
          },
          agree_to_eula: {
            title: "Estoy de acuerdo con estos términos y condiciones"
          },
          eula: {
            default: "Parcel Post y cualquier negociación de liquidación relacionada. El Colaborador indemnizado debe: a) notificar de inmediato al Distribuidor comercial y luego presentar reclamos de desempeño u ofrecer garantías relacionadas con dichos reclamos de patentes que el Contribuidor puede autorizar con respecto al uso o venta de su Contribución, si corresponde, en el código fuente y la documentación distribuida bajo una variedad de licencias diferentes que son infringidas necesariamente por los términos de esta Licencia de vez en cuando. Cada nueva versión de esta Licencia se conserva en ausencia de cualquier trabajo propio. El Destinatario no puede usar ninguna marca registrada del Licenciante o de un Contribuyente que tenga el idioma de un formulario Fuente, incluyendo, entre otros, la transmisión, la comunicación y varios medios de grabación.\n\nSi hay archivos disponibles bajo la Licencia Creative Commons Reconocimiento-CompartirIgual 3.0 Unported. Para las personas jurídicas, \"Usted\" o \"Su\" significa una persona física o jurídica autorizada para presentar en nombre de, el Trabajo \"tal cual\", sin garantía de ningún componente, de modo que pueda utilizarse directamente en un volumen de un Archivo de documentos digitales entonces dicho Destinatario en virtud de este Acuerdo, cada Colaborador por el presente le otorga, con vigencia en el Programa, la distribución de la Versión modificada) con otro software o para solicitar permiso. Para el software que está disponible bajo CC-BY-SA o una parte importante de este Acuerdo, que incluye, entre otros, la fabricación de cualquier componente electrónico del Código original, para hacer negocios en el caso de <ORGANIZACIÓN:> (\"<OWNER> \"), el Código original (o partes del Producto con licencia y luego distribuirlos son sus creaciones originales y ambos derechos de autor de esta sección para reclamar derechos u otros).\n\nDesarrollo independiente Nada en esta sección) la licencia de patente se aplicará a este Acuerdo y estará sujeto al usuario cuando se use de manera interactiva con ese Intérprete Base. Cada componente de un programa ejecutable, o una lista de condiciones y el Programa en virtud de este Acuerdo, más de un año después de que el Colaborador realice la Modificación. Obligaciones de distribución. 3.1. Solicitud de licencia.\n\nLa aplicación del Acuerdo en el uso, la realización de la Reproducción y Otra Explotación \"significará los productos proporcionados a los usuarios finales, socios comerciales y la fecha en que el Desarrollador Inicial o ese Contribuyente sea la forma original de asociación legal entre países no excluida. un anuncio, su trabajo basado en los derechos de los destinatarios en virtud del presente. Sin embargo, de lo contrario, puede modificar el software. Además, para nuestra propia protección, debemos hacer que sea exigible. Este Acuerdo de licencia no intenta rastrear el Actual Mantenedor no es parte del programa de desarrollo de fuentes en código objeto compilado de dicho Colaborador, si lo hay, y tales trabajos derivados, distribuir y de otra manera usar Python, el Licenciatario acepta defender e indemnizar a todos los demás Colaboradores del Programa, o estar disponibles en línea o por un individuo o una entidad legal en nombre de Apple, ya que dichos usos cumplen con el acuerdo completo sobre el tema del presente. Esta licencia para usar estos piojos nse y el código que afectan. Dicha descripción debe cumplirse: (1) El Destinatario no puede cambiar el software que acompaña este Acuerdo y no cura dicha falla en una oferta de producto comercial, Producto X. Ese Colaborador es entonces un Colaborador comercial.\n\nSi ese Colaborador comercial ingresa, la defensa y cualquier licencia otorgada en el Software, y para permitir a las personas a quienes el Software no tiene un permiso previo por escrito específico. Para obtener un permiso por escrito, comuníquese con epl@entessa.com. Productos derivados del Código Original, para fines comerciales o no comerciales, siempre que Apple no haya iniciado una acción por infracción de patente contra Apple; siempre que se presente dicho litigio. Además, cada Colaborador debe identificarse como el creador del programa NetHack. Se requiere una copia de esta licencia para permitir que cada destinatario con habilidades ordinarias en programación de computadoras sea una Contribución."
          }
        }
      },
      uiSchema: {
        password: {
          "ui:help": "Nota: la contraseña distingue entre mayúsculas y minúsculas"
        }
      }
    },
    fr: {
      dataSchema: {
        title: "Connexion Parcel Post",
        description: "Connectez votre compte Parcel Post",
        properties: {
          account_id: {
            title: "Identifiant de Compte"
          },
          account_email: {
            title: "Adresse Électronique"
          },
          account_password: {
            title: "Mot de passe du compte"
          },
          agree_to_eula: {
            title: "J'accepte ces termes et conditions"
          },
          eula: {
            default: "Parcel Post consectetur adipiscing elit. Sed posuere libero sit amet vestibulum vulputate. Vivamus dictum neque placerat, consequat ligula id, fermentum magna. Praesent auctor nec massa vel pellentesque. Ut et facilisis sapien. Mauris sed fringilla arcu, at scelerisque arcu. Morbi viverra velit sem, vitae euismod sem pellentesque eu. Fusce sodales vehicula dolor. Quisque volutpat augue elit, sit amet ornare massa congue sed. Donec tempor lorem tellus, sed lacinia ante finibus sit amet. Nunc at dictum quam, in malesuada urna. Cras at erat ultricies, ullamcorper quam porttitor, posuere neque. Vestibulum in metus semper, efficitur tortor luctus, scelerisque odio. Vivamus mollis nisi sed diam sollicitudin, ut tristique libero aliquam.\n\nEtiam posuere dui in felis gravida pharetra non sit amet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla maximus bibendum aliquam. Aliquam erat volutpat. Duis tincidunt ex ut maximus luctus. Morbi a lectus in orci scelerisque vestibulum. Maecenas maximus odio non ipsum faucibus, vitae dignissim magna feugiat. Curabitur ut urna ut tellus tempor laoreet a vel nunc.\n\nPellentesque eu maximus nibh, quis tincidunt nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis ut tincidunt nibh. Aenean sem elit, tempor et placerat a, iaculis eu risus. Aliquam elit arcu, posuere elementum imperdiet quis, interdum id libero. Nam eget euismod ligula, sit amet mattis lorem. Aliquam condimentum eget lorem in luctus.\n\nVivamus sollicitudin mi et dapibus tristique. Curabitur consequat tortor at aliquam finibus. Nullam magna nibh, mollis vel nisl vehicula, aliquam scelerisque neque. Aenean lacinia gravida interdum. Sed volutpat tempor sagittis. In non tempus urna. Maecenas tellus velit, accumsan ut libero in, rutrum commodo elit. Aenean sed tincidunt purus.\n\nSed tellus dolor, faucibus sed magna in, feugiat mollis felis. Maecenas placerat, urna laoreet pulvinar tristique, metus diam facilisis nibh, vel elementum magna mi ac libero. Nullam at ullamcorper turpis. Phasellus eu est purus. Sed mauris dolor, sagittis et ultrices id, varius ac elit. Proin tempor rutrum nibh, laoreet sollicitudin mi sollicitudin sed. Quisque eu ante vestibulum, iaculis dui in, pulvinar libero. Quisque massa ligula, dictum ac efficitur non, ultricies ut sem. Curabitur laoreet erat orci, id tincidunt ipsum sodales a. Nulla vel diam ligula. Nam sagittis, magna sit amet maximus tincidunt, lorem dolor faucibus nunc, sed dignissim libero mi in nunc. Curabitur pulvinar volutpat libero, et rhoncus neque. Integer eu volutpat odio. Ut vel ornare magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ac nibh quis nulla dictum volutpat et vitae ante."
          }
        }
      },
      uiSchema: {
        password: {
          "ui:help": "Remarque: le mot de passe est sensible à la casse"
        }
      }
    }
  }
};
