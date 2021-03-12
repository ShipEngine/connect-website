{{- define "fullname" -}}
{{- printf "%s-%s%s" .Chart.Name .Values.stack.environment (.Values.stack.partition | default "") | lower | trunc 63 | trimSuffix "-" -}}
{{- end -}}
