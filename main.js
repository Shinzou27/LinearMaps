/*  Trabalho de Álgebra Linear

    Professor:  Paulo Ricardo Pinheiro Sampaio

    Alunos:     Felipe Cassiano Barbosa
                Gabriela Araujo de Abreu
                Victor Nunes Saboia

    Ainda resta:
        ● Tudo feito! :D
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
    unCoordHomogeneasVetor(a) {
        return a.pop();
    }
    //Algoritmo do produto de matrizes
    times(a, b) {
        this.coordHomogeneasTL(a);
        this.coordHomogeneasVetor(b);
        var dimensao = a.length-1;
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
        var lambda = matrizTimes[dimensao][0];
        var resultado = [];
        for (i = 0; i < matrizTimes.length-1; i++) {
            resultado[i] = [matrizTimes[i][0]/lambda];
        }
        this.unCoordHomogeneasVetor(b);
        return resultado;
    }
    //Algoritmo para produto de matrizes apenas para a translação!!!!
    times2(a, b) {
        this.coordHomogeneasVetor(b);
        var dimensao = a.length-1;
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
        var lambda = matrizTimes[dimensao][0];
        var resultado = [];
        for (i = 0; i < matrizTimes.length-1; i++) {
            resultado[i] = [matrizTimes[i][0]/lambda];
        }
        this.unCoordHomogeneasVetor(b);
        return resultado;
    }
    //Algoritmo para imprimir o vetor no sistema cartesiano 
    normatizar(vector) {
        var resultado = "Resultado: (";
        for (var i = 0; i < vector.length; i++) {
            var coordenada = parseFloat(vector[i][0]).toFixed(2);
            if (i != vector.length-1) {
                resultado += coordenada + ", "
            }
            else {
                resultado += coordenada;
            }
        }
        resultado += ")"
        return console.log(resultado);
    }

    /*
    | -------- Métodos de Transformação Linear -------- |
    */
    translate2D(vector, dx, dy){
        var transfLinear = [[1, 0, dx],
                            [0, 1, dy],
                            [0, 0, 1]];
        return this.normatizar(this.times2(transfLinear, vector));
    }
    translate3D(vector, dx, dy, dz){
        var transfLinear = [[1, 0, 0, dx],
                            [0, 1, 0, dy],
                            [0, 0, 1, dz],
                            [0, 0, 0, 1]];
        return this.normatizar(this.times2(transfLinear, vector));
    }
    rotation2D(vector, angle){
        if(angle!=0){
            if(angle>0){
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), -(Math.sin(angle*(Math.PI/180)))],
                                [Math.sin(angle*(Math.PI/180)), Math.cos(angle*(Math.PI/180))]];
            } else {
                angle = Math.abs(angle);
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), (Math.sin(angle*(Math.PI/180)))],
                                    [-(Math.sin(angle*(Math.PI/180))), Math.cos(angle*(Math.PI/180))]];
            }  
            return this.normatizar(this.times(transfLinear, vector));
        } else {
            return this.normatizar(vector);
        }  
    }
    rotation3DX(vector, angle){
        if(angle!=0){
            if(angle>0){
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), -(Math.sin(angle*(Math.PI/180)))],
                                [Math.sin(angle*(Math.PI/180)), Math.cos(angle*(Math.PI/180))]];
            } else {
                angle = Math.abs(angle);
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), (Math.sin(angle*(Math.PI/180)))],
                                    [-(Math.sin(angle*(Math.PI/180))), Math.cos(angle*(Math.PI/180))]];
            }  

            var matriz = [
                                [1, 0, 0], 
                                [0, transfLinear[0][0], transfLinear[0][1]],
                                [0, transfLinear[1][0], transfLinear[1][1]]
                            ];

            return this.normatizar(this.times(matriz, vector));
        } else {
            return this.normatizar(vector);
        }  
    }
    rotation3DY(vector, angle){
        if(angle!=0){
            if(angle>0){
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), -(Math.sin(angle*(Math.PI/180)))],
                                [Math.sin(angle*(Math.PI/180)), Math.cos(angle*(Math.PI/180))]];
            } else {
                angle = Math.abs(angle);
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), (Math.sin(angle*(Math.PI/180)))],
                                    [-(Math.sin(angle*(Math.PI/180))), Math.cos(angle*(Math.PI/180))]];
            }  

            var matriz =    [
                                [transfLinear[0][0], 0, transfLinear[1][0]], 
                                [0, 1, 0],
                                [ transfLinear[0][1], 0, transfLinear[1][1]]
                            ];

            return this.normatizar(this.times(matriz, vector));
        } else {
            return this.normatizar(vector);
        }  
    }
    rotation3DZ(vector, angle){
        if(angle!=0){
            if(angle>0){
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), -(Math.sin(angle*(Math.PI/180)))],
                                [Math.sin(angle*(Math.PI/180)), Math.cos(angle*(Math.PI/180))]];
            } else {
                angle = Math.abs(angle);
                var transfLinear = [[Math.cos(angle*(Math.PI/180)), (Math.sin(angle*(Math.PI/180)))],
                                    [-(Math.sin(angle*(Math.PI/180))), Math.cos(angle*(Math.PI/180))]];
            }  

            var matriz =    [
                                [transfLinear[0][0], transfLinear[0][1], 0], 
                                [transfLinear[1][0], transfLinear[1][1], 0],
                                [0, 0, 1]
                            ];

            return this.normatizar(this.times(matriz, vector));
        } else {
            return this.normatizar(vector);
        }  
    }
    reflection2DX(vector){
        var transfLinear = [[-1, 0], 
                            [0, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    reflection2DY(vector){
        var transfLinear = [[1, 0], 
                            [0, -1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    reflection3DX(vector){
        var transfLinear = [[-1, 0, 0], 
                            [0, 1, 0],
                            [0, 0, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    reflection3DY(vector){
        var transfLinear = [[1, 0, 0], 
                            [0, -1, 0],
                            [0, 0, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    reflection3DZ(vector){
        var transfLinear = [[1, 0, 0], 
                            [0, 1, 0],
                            [0, 0, -1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
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
    projection3DY(vector) {
        var transfLinear = [[1, 0, 0], 
                            [0, 0, 0],
                            [0, 0, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    projection3DZ(vector) {
        var transfLinear = [[1, 0, 0], 
                            [0, 1, 0],
                            [0, 0, 0]];
        return this.normatizar(this.times(transfLinear, vector));
    }
    shearing(vector, kx, ky){
        var transfLinear = [[1, kx],
                            [ky, 1]];
        return this.normatizar(this.times(transfLinear, vector));
    }
}
function declareVector() {
    var input = prompt("Digite as coordenadas cartesianas do vetor.");
    var i = 0;
    var vetor = [];
    var index = 0;
    var buildingNumber = "";
    while (input[i] != ")") {
        if (parseInt(input[i])*0 == 0) {
            if(input[i-1] == "-") {
                buildingNumber = buildingNumber + input[i-1];
            }
            buildingNumber = buildingNumber + input[i];
            if (isNaN(parseInt(input[i+1])) && !isNaN(buildingNumber)) {
                vetor[index] = [parseInt(buildingNumber)];
                buildingNumber = "";
                index++;
            }
        }
        else if(input[i] == undefined) {
            break;
        }
        i++;
    }
    console.log("Vetor original = (" + vetor + ")")
    return vetor;
}

//Para testar os cálculos, é só descomentar as variáveis vetor e calculo e chamar os métodos!

/*
var vetor = declareVector();
var calculo = new Transformations();
*/