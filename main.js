/*  Trabalho de Álgebra Linear

    Professor:  Paulo Ricardo Pinheiro Sampaio

    Alunos:     Felipe Cassiano Barbosa
                Gabriela Araujo de Abreu
                Victor Nunes Saboia

    Ainda resta:
        ● Translação (em 2D e em 3D)
            ○ translate2D(vector, dx, dy)
            ○ translate3D(vector, dx, dy, dz)

        ● Rotação (em 2D e em todos os eixos em 3D)
            ○ roration2D(vector, angle)
            ○ rotation3DX(vector, angle)
            ○ rotation3DY(vector, angle)
            ○ rotation3DZ(vector, angle)

        ● Reflexão (em todos os eixos nas dimensões 2D e 3D)
            ○ reflection2DX(vector)
            ○ reflection2DY(vector)
            ○ reflection3DX(vector)
            ○ reflection3DY(vector)
            ○ reflection3DZ(vector)

        ● Projeção (em todos os eixos em 2D e m 3D)
            ○ projection3DY(vector)
            ○ projection3DZ(vector)

        ● Cisalhamento (apenas em 2D)
            ○ shearing(vector, kx, ky)
*/

class Transformations {
    //Transforma a matriz de transformação linear para coordenadas homogêneas
    coordHomogeneasTL(a) {
        var numLinhas = a[0].length;
        a[numLinhas] = [];
        for (var i = 0; i <= numLinhas; i++) {
            a[i][numLinhas] = 0;
            a[numLinhas][i] = 0;
        }
        a[numLinhas][i-1] = 1;
        return a;
    }
    //Transforma o vetor para coordenadas homogêneas
    coordHomogeneasVetor(a) {
        var numLinhas = a.length;
        a[numLinhas] = [1];
        return a;
    }
    //Algoritmo do produto de matrizes
    times(a, b) {
        this.coordHomogeneasTL(a);
        this.coordHomogeneasVetor(b);

        var soma = 0;
        var matrizTimes = [];

        for (var m = 0; m < a.length; m++) {
            matrizTimes[m] = [];
            for (var p = 0; p < b[0].length; p++) {
                for (var i = 0; i < b.length; i++) {
                    soma += a[m][i] * b[i][p]; 
                }
                matrizTimes[m][p] = soma;
                soma = 0;
            }
        }
        var lambda = matrizTimes[2][0];
        var resultado = [];
        for (i = 0; i < matrizTimes.length-1; i++) {
            resultado[i] = [matrizTimes[i][0]/lambda];
        }
        return resultado;
    }
    //Algoritmo para imprimir o vetor no sistema cartesiano 
    normatizar(vector) {
        var resultado = "Resultado: (";
        for (var i = 0; i < vector.length; i++) {
            if (i != vector.length-1) {
                resultado += vector[i][0] + ", "
            }
            else {
                resultado += vector[i][0];
            }
        }
        resultado += ")"
        return resultado;
    }

    /*
    | -------- Métodos de Transformação Linear -------- |
    */

    projection2DX(vector) {
        var transfLinear = [[1, 0], 
                            [0, 0]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    projection2DY(vector) {
        var transfLinear = [[0, 0], 
                            [0, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    projection3DX(vector) {
        var transfLinear = [[0, 0, 0], 
                            [0, 1, 0],
                            [0, 0, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
}
//Para testar os cálculos, é só criar um objeto da classe Transformations e chamar o método!