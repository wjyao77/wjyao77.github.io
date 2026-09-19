(() => {
  'use strict';
  const key = 'alucard-wjy77-card-v1';
  const empty = {name:'', role:'', bio:'', interests:[], email:'', linkLabel:'', linkUrl:''};
  const $ = id => document.getElementById(id);
  const dialog = $('editor');
  const form = $('editor-form');
  let content = {...empty};
  let toastTimer;
  const safeUrl = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  const clean = value => {
    const result = {...empty};
    for (const field of ['name','role','bio','email','linkLabel','linkUrl']) result[field] = typeof value?.[field] === 'string' ? value[field].trim() : '';
    result.interests = Array.isArray(value?.interests) ? value.interests.filter(x => typeof x === 'string').map(x=>x.trim()).filter(Boolean).slice(0,6) : [];
    result.linkUrl = safeUrl(result.linkUrl);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) result.email = '';
    return result;
  };
  const setField = (id, value, placeholder) => { $(id).textContent = value || placeholder; $(id).classList.toggle('placeholder', !value); };
  function render() {
    setField('name', content.name, '姓名待填写');
    const period = document.createElement('span'); period.className = 'name-period'; period.textContent = '.'; $('name').append(period);
    $('identity-label').textContent = content.name ? 'PERSONAL RESEARCH CARD' : 'YOUR NAME HERE';
    setField('role', content.role, '身份 / 研究领域 · 待填写');
    setField('bio', content.bio, '这里留给你的个人简介。');
    $('topics').replaceChildren();
    for(const text of content.interests.length ? content.interests : ['研究方向 · 待填写']) { const el = document.createElement('span'); el.className = 'topic' + (content.interests.length ? '' : ' placeholder'); el.textContent = text; $('topics').append(el); }
    $('email-placeholder').hidden = Boolean(content.email); $('email-link').hidden = !content.email;
    $('email-link').textContent = content.email; if(content.email) $('email-link').href = 'mailto:' + content.email; else $('email-link').removeAttribute('href');
    $('external-placeholder').hidden = Boolean(content.linkUrl); $('external-link').hidden = !content.linkUrl;
    $('external-link').textContent = (content.linkLabel || '个人链接') + ' ↗'; if(content.linkUrl) $('external-link').href = content.linkUrl; else $('external-link').removeAttribute('href');
    $('footer-name').textContent = content.name || 'alucard / wjy77';
    document.title = (content.name || 'alucard / wjy77') + ' — 个人研究名片';
  }
  function openEditor() {
    for(const field of Object.keys(empty)) form.elements[field].value = field === 'interests' ? content.interests.join('，') : content[field];
    $('editor-status').textContent = ''; dialog.showModal(); document.body.classList.add('modal-open');
  }
  function closeEditor() { dialog.close(); }
  function fromForm() { const values = Object.fromEntries(new FormData(form)); values.interests = values.interests.split(/[,，、;；\n]/).map(x=>x.trim()).filter(Boolean); return clean(values); }
  $('open-editor').addEventListener('click', openEditor);
  $('close-editor').addEventListener('click', closeEditor);
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeEditor(); } });
  form.addEventListener('submit', event => {
    event.preventDefault(); content = fromForm(); render();
    try { localStorage.setItem(key,JSON.stringify(content)); closeEditor(); $('toast').textContent = '已保存至当前浏览器'; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>$('toast').classList.remove('visible'),2800); }
    catch { $('editor-status').textContent = '浏览器未允许保存。你仍可下载配置，保留本次内容。'; }
  });
  $('download-content').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const data = fromForm(); const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'}));
    const link = document.createElement('a'); link.href = url; link.download = 'content.json'; document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('editor-status').textContent = '配置已下载。替换网站的 content.json 并重新发布后，线上内容才会更新。';
  });
  async function initialize() {
    try { const response = await fetch('./content.json',{cache:'no-cache'}); if(response.ok) content = clean(await response.json()); } catch {}
    try { const local = localStorage.getItem(key); if(local) content = clean(JSON.parse(local)); } catch {}
    render();
  }
  initialize();
})();
