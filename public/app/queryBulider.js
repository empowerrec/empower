angular.module('app').factory('queryBulider', function () {
    //Query builder from the parse tree
    /*
        <expression>  ::=  <term> *( || <term> )
        <term>  ::=  <factor> *( && <factor> )
        <factor>  ::=  <pred>  |  "(" <expression> ")"
        <pred> ::= [!] <var> | <var> (!==|===|==|!=|>=|<=|>|<) ("<string>" | '<string>' | <number> | true | false | null | undefined)
        <var> ::= {a-zA-Z_} *({$_-a-zA-Z0-9})
        <string> ::= "" | {.} *(<string>)
        <number> ::= [-] 1*({0-9}) ["." 1*({0-9})]
    */

    var parseExpression = function (s) {
        var o = parseTerm(s);
        s = o.s.trim();
        var n = o.t;

        var t = { childs: [n] };

        while (s.substr(0, 2) === "||") {
            t.content = "||";
            s = s.substr(2);
            o = parseTerm(s);
            s = o.s.trim();
            n = o.t;
            t.childs.push(n);
        }

        if (!t.content) {
            t = n;
        }

        return { t: t, s: s };
    };

    var parseTerm = function (s) {

        s = s.trim();
        var o = parseFactor(s);
        s = o.s.trim();
        var n = o.t;
        var t = { childs: [n] };

        while (s.substr(0, 2) === '&&') {
            t.content = '&&';
            s = s.substr(2);
            o = parseFactor(s);
            s = o.s.trim();
            n = o.t;
            t.childs.push(n);
        }

        if (!t.content) {
            t = n;
        }

        return { t: t, s: s };
    };

    var parseFactor = function (s) {
        s = s.trim();
        var o;
        if (s.substr(0, 1) === '(') {
            s = s.substr(1);
            o = parseExpression(s);
            s = o.s.trim();
            // remove the close backet )
            if (s.substr(0, 1) !== ')') {
                throw new Error('missing )');
            }
            s = s.substr(1);
        } else if (s.substr(0, 1) === ')') {
            throw new Error('extra )');
        } else {
            o = parsePred(s);
            s = o.s;
        }

        return { s: s, t: o.t };
    };

    var parsePred = function (s) {
        s = s.trim();
        var t = { content: '' };

        if (s.substr(0, 1) === '!') {
            t.content = "!";
            s = s.substr(1);
        }


        var o = parseVar(s);
        s = o.s.trim();

        if (o.ms.trim() === "") {
            throw new Error('missing LHS variable');
        }
        //t.content += o.ms.trim();
        t.childs = [{ content: o.ms.trim() }];

        var comp = "";
        if (s.substr(0, 3) === "===" || s.substr(0, 3) === "!==") {
            comp = s.substr(0, 3);
            s = s.substr(3);
        } else if (s.substr(0, 2) === "==" || s.substr(0, 2) === "!=" || s.substr(0, 2) === ">=" || s.substr(0, 2) === "<=") {
            comp = s.substr(0, 2);
            s = s.substr(2);
        } else if (s.substr(0, 1) === ">" || s.substr(0, 1) === "<") {
            comp = s.substr(0, 1);
            s = s.substr(1);
        }

        if (comp !== "") {
            //t.content += comp;
            t.content = comp;


            s = s.trim();
            if (s.substr(0, 1) === "'") {
                s = s.substr(1);
                o = parseString(s, "'");
                s = o.s.trim();
                if (s.substr(0, 1) !== "'") {
                    throw new Error("missing closing '");
                }
                s = s.substr(1);
                o.ms = o.ms.trim();
            } else if (s.substr(0, 1) === "\"") {
                s = s.substr(1);
                o = parseString(s, "\"");
                s = o.s.trim();
                if (s.substr(0, 1) !== "\"") {
                    throw new Error("missing closing \"");
                }
                s = s.substr(1);
                o.ms = o.ms.trim();
            } else if (s.substr(0, 4) === "true") {
                o.ms = true;
                s = s.substr(4);
            } else if (s.substr(0, 4) === "null") {
                o.ms = null;
                s = s.substr(4);
            } else if (s.substr(0, 5) === "false") {
                s = s.substr(5);
                o.ms = false;
            } else if (s.substr(0, 9) === "undefined") {
                s = s.substr(9);
                o.ms = undefined;
            } else {
                o = parseNumber(s);
                s = o.s;
            }

            //t.content += o.ms.trim();     
            t.childs.push({ content: o.ms });
        }

        if (t.content === "") {
            t.content = t.childs[0].content;
            delete t.childs;
        }

        return { t: t, s: s };


    };

    var parseVar = function (s) {
        s = s.trim();
        var ms = "";
        if (s.substr(0, 1).match(/[a-zA-Z_]/)) {
            ms = s.substr(0, 1);
            s = s.substr(1);

            while (s.substr(0, 1).match(/[a-zA-Z_0-9$\.\-]/)) {
                ms += s.substr(0, 1);
                s = s.substr(1);
            }

        } else {
            throw new Error('invalid character in variable name');
        }

        return { s: s, ms: ms };
    };

    var parseString = function (s, stopChar) {
        var ms = "";
        while (s.substr(0, 1) !== stopChar && s.length !== 0) {
            if (s.substr(0, 2) === '\\' + stopChar) {
                ms += stopChar;
                s = s.substr(2);
            } else {
                ms += s.substr(0, 1);
                s = s.substr(1);
            }
        }
        return { s: s, ms: ms };
    };

    var parseNumber = function (s) {

        s = s.trim();

        var ms = "";
        if (s.substr(0, 1) === "-") {
            ms += "-";
            s = s.substr(1);
        }

        while (s.substr(0, 1).match(/[0-9]/)) {
            ms += s.substr(0, 1);
            s = s.substr(1);
        }

        if (ms === '-' || ms.length === 0) {
            throw new Error('parse RHS variable error');
        }

        if (s.substr(0, 1) === ".") {
            ms += ".";
            s = s.substr(1);

            var c = 0;
            while (s.substr(0, 1).match(/[0-9]/)) {
                ms += s.substr(0, 1);
                s = s.substr(1);
                c++;
            }

            if (c === 0) {
                throw new Error('parse number error');
            }
        }

        return { s: s, ms: parseFloat(ms) };
    };

    var build = function (tree) {

        var query = {};

        var pushChild = function (op, childs) {
            query[op] = [];
            childs.forEach(function (child) {
                query[op].push(build(child));
            });
        };

        // console.log(tree.childs);
        if (tree.content === '||') {
            pushChild('$or', tree.childs);
        } else if (tree.content === '&&') {
            pushChild('$and', tree.childs);
        } else if (tree.content === '===' || tree.content === '==') {
            if (tree.childs[1].content === undefined) {
                query[tree.childs[0].content] = { '$exists': false };
            } else {
                query[tree.childs[0].content] = tree.childs[1].content;
            }
        } else if (tree.content === '!==' || tree.content === '!=') {
            if (tree.childs[1].content === undefined) {
                query[tree.childs[0].content] = { '$exists': true };
            } else {
                query[tree.childs[0].content] = { '$ne': tree.childs[1].content };
            }
        } else if (tree.content === '>') {
            query[tree.childs[0].content] = { '$gt': tree.childs[1].content };
        } else if (tree.content === '>=') {
            query[tree.childs[0].content] = { '$gte': tree.childs[1].content };
        } else if (tree.content === '<') {
            query[tree.childs[0].content] = { '$lt': tree.childs[1].content };
        } else if (tree.content === '<=') {
            query[tree.childs[0].content] = { '$lte': tree.childs[1].content };
        } else if (tree.content === '!') {
            query[tree.childs[0].content] = false;
        } else if (tree.content) {
            query[tree.content] = true;
        }

        return query;
    };

    var parse = function (exp) {
        if (!exp || exp === true || typeof exp === 'string' && exp.trim() === '') {
            return {};
        }

        var o = parseExpression(exp);

        if (o.s !== '') {
            throw new Error('Syntax Error');
        }
        return o.t;
    };

    return {
        qb: function (exp) {
            return build(parse(exp));
        }
    };
});