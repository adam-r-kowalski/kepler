import { createSignal, For, Match, Switch } from "solid-js"
import { faker } from "@faker-js/faker"
import { http } from "http"
import { ws } from "ws"

import { Kepler } from "./Kepler"
import { Gpt3LanguageModel } from "./LanguageModel"

type OnMessage = (text: string) => void

const wss = new ws.Server({ noServer: true })

kepler = new Kepler(new Gpt3LanguageModel())

function accept(req, res) {
    // all incoming requests must be websockets
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.end();
        return;
    }

    // can be Connection: keep-alive, Upgrade
    if (!req.headers.connection.match(/\bupgrade\b/i)) {
        res.end();
        return;
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
    ws.on('message', function (message) {
        message = message.toString();
        kepler.send(message);
    });
}

if (!module.parent) {
    http.createServer(accept).listen(8080);
} else {
    exports.accept = accept;
}
