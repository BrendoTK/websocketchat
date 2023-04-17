//socket do cliente

//document.onload = () => {}

$(() => {
    const socket = io()
    console.log("Abrindo conexão com o servidor")

    $('form').submit(() => {
        socket.emit("message", $('#texto').val())
        return false;
    })

    $("#texto").keydown(() => socket.emit("status", "Está digitando"))
    $("#texto").keyup(() => socket.emit("status", ""))

    socket.on("message", (texto) => $("#mensagens").append($('<li>').text(texto)))

    socket.on("status", texto => $("#status").html(texto))
})