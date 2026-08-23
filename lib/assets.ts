// Prefixa assets estaticos com o basePath do deploy.
// O basePath do Next reescreve rotas, mas nao atributos src/href crus,
// entao referencias a arquivos em /public precisam passar por aqui.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const asset = (path: string) => `${BASE_PATH}${path}`
