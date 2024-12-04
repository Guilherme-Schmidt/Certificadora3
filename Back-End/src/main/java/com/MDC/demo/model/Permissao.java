package com.MDC.demo.model;

public enum Permissao {
    ADMIN ("ADMIN"),
    VOLUNTARIO ("VOLUNTARIO"),
    APOIADOR("APOIADOR");

    private String permisao;

    Permissao(String permisao){
        this.permisao=permisao;
    }
    public String getPermisao() {
        return permisao;
    }

}
