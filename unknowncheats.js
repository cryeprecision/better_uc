/// <reference path="./jquery-3.6.0.js" />

// Copy some text to the clipboard
const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  } catch (e) {
    alert(`Couldn't copy to clipboard: ${e}`);
  }
};

// Make the `Mark This Forum Read` button more accessible
const addMarkAllRead = () => {
  // Find the `Mark This Forum Read` button
  const markRead = $('tr>td>a')
    .filter((i, e) => e.href.includes('do=markread') && e.text.includes('This Forum'))
    .first();
  // Find the `Forum Tools`
  const forumTools = $('#forumtools');
  // Add the button to the end of the bar
  $('<td>').addClass('vbmenu_control').append(markRead.clone()).insertBefore(forumTools);
};

const addCopyToCodeBlocks = () => {
  const getCodeText = elem => {
    const codeLines = $(elem).children('ol').children('li').toArray();
    return codeLines.reduce((acc, e) => acc + e.innerText + '\n', '');
  };

  // Find all code-blocks
  const codeBlocks = $('pre.prettyprint.linenums.prettyprinted');
  // Create a button-template
  const btn = $('<button>').addClass('copyButton').text('copy code');
  // Add a button to each code-block
  codeBlocks.each((i, e) =>
    btn
      .clone()
      .on('click', () => copyToClipboard(getCodeText(e)))
      .appendTo(e.parentElement),
  );
};

const addCopyToCodeLines = () => {
  const getLineText = elem => {
    const text = $(elem).parent().get(0).innerText;
    return text.substring('code'.length);
  };

  const codeBlocks = $('pre.prettyprint.linenums.prettyprinted');
  const codeLines = codeBlocks.find('>ol>li');

  // add hover effect to code-lines
  codeLines.addClass('codeLine');

  // make template for copy-button
  const copyButton = $('<button>')
    .addClass('copyCodeLineButton')
    .text('copy')
    .on('click', ({ target }) => copyToClipboard(getLineText(target)));
  // add copy-button to each line
  copyButton.prependTo(codeLines);
};

const removeBannerImage = () => {
  $('#bannerImage').parents().eq(3).css({ display: 'none' });
};

const compactifyUserInfos = () => {
  const postTables = $('#posts')
    .find('table')
    .filter((e, i) => i.id && !i.id.includes('imageresizer'));

  // Find the part with the user infos
  const aboutUser = postTables.find('>tbody>tr:nth-child(2)>td:first-child');

  // Remove the avatars
  const images = aboutUser.find('>div>center>a>img');
  images.each((i, e) => $(e).parents().eq(2).css({ display: 'none' }));

  // Remove the stars
  aboutUser.find('>center').css({ display: 'none' });

  aboutUser.each((i, e) => {
    const infos = $(e).children('div').last();
    infos.find('>div').each((i, e) => {
      // Remove last achievements
      $(e).find('>fieldset').parent().css({ display: 'none' });
      // Remove points, level-up, activity
      $(e).find('>div>table:first-child').parents().eq(1).css({ display: 'none' });
    });
  });
};

const wrapImagesInSpoiler = () => {
  // Remove the resize warnings
  $('table[id^=ncode_imageresizer_warning_]').css({ display: 'none' });
  // Find all images within posts that aren't emojis or part of a resize warning
  const postImgs = $('div[id^=post_message_]')
    .find('img')
    .not('.inlineimg')
    .filter((i, e) => !e.src.includes('unknowncheats.me/forum/images/'));
  // Remove `width` and `height` to make the image full-size
  postImgs.removeAttr('width').removeAttr('height').addClass('myImg');
  // Wrap the image in a `details` tag
  postImgs.wrap($('<details>').addClass('myDetails'));
  // Add a summary to the details
  $('<summary>')
    .addClass(['mySummary', 'unselectable'])
    .text(`${postImgs.attr('src')}`)
    .insertBefore(postImgs);
};

const removeSignatures = () => {
  $('td[id^=td_post_]>div>div.fixedsig').parent().css({ display: 'none' });
};

const runAll = () => {
  addMarkAllRead();
  addCopyToCodeBlocks();
  addCopyToCodeLines();
  compactifyUserInfos();
  wrapImagesInSpoiler();
  removeSignatures();
  removeBannerImage();
};

// Inject custom css rules
$(`<style type='text/css'>${GM_getResourceText('CUSTOM_CSS')}</style>`).appendTo('head');

// Inject material ui
// $('<meta name="viewport" content="width=device-width, initial-scale=1">').appendTo('head');
// $('<link href="//cdn.muicss.com/mui-0.10.3/css/mui.min.css" rel="stylesheet" type="text/css" />').appendTo('head');
// $('<script src="//cdn.muicss.com/mui-0.10.3/js/mui.min.js"></script>').appendTo('head');

// Do the thingies
runAll();
