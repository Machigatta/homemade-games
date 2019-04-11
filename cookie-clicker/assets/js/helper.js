function printAt( context , text, x, y, lineHeight)
{
    var lines = text.split('\n');

    for (var i = 0; i<lines.length; i++)
    context.fillText(lines[i], x, y + (i*lineHeight) );
}