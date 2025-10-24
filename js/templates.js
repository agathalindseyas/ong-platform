// Templates (string literals) — usam suas classes e tokens já existentes
export const Home = () => `
  <section class="section">
    <div class="container">
      <h1 class="h1">Junte-se a nós na transformação</h1>
      <p>Somos uma organização dedicada a promover inclusão social, educação e desenvolvimento comunitário.</p>
      <p class="mt-16"><a class="btn btn--primary" href="#/projetos">Conheça nossos projetos</a></p>
      <div class="mt-24"><img src="assets/images/projeto1.jpg" alt="Voluntários da ONG em ação"></div>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="sobre-title">
    <div class="container">
      <h2 id="sobre-title" class="h2">Missão, Visão e Valores</h2>
      <p><strong>Missão:</strong> promover oportunidades educacionais e sociais para comunidades vulneráveis.</p>
      <p><strong>Visão:</strong> uma sociedade mais justa e igualitária.</p>
      <p><strong>Valores:</strong> transparência, respeito, colaboração.</p>
    </div>
  </section>
`;

export const Projetos = () => `
  <section class="section container">
    <h1 class="h1">Projetos Sociais e Oportunidades</h1>

    <section id="voluntariado" class="section" aria-labelledby="voluntariado-title">
      <h2 id="voluntariado-title" class="h2">Voluntariado: Oportunidades</h2>
      <p>Confira as oportunidades de voluntariado e inscreva-se para participar. Sua ajuda faz a diferença!</p>

      <ul class="cards mt-24">
        <li class="card">
          <div class="card__body">
            <h3 class="card__title">Reforço Escolar — Bairro Alfa
              <span class="badge badge--success">Ativo</span>
            </h3>
            <p>Descrição breve do projeto, metas e impacto. Aulas de reforço para crianças.</p>
            <p><strong>Vagas:</strong> 10 voluntários disponíveis</p>
            <p class="mt-16">
              <a class="btn btn--primary" href="#/cadastro?interesse=voluntariado&id=reforco-alfa">Inscrever-se</a>
            </p>
          </div>
        </li>

        <li class="card">
          <div class="card__body">
            <h3 class="card__title">Oficinas de Tecnologia
              <span class="badge badge--warning">Vagas</span>
            </h3>
            <p>Capacitação para jovens em programação e eletrônica.</p>
            <p><strong>Vagas:</strong> 5 instrutores voluntários</p>
            <p class="mt-16">
              <a class="btn btn--ghost" href="#/cadastro?interesse=voluntariado&id=tecnologia">Inscrever-se</a>
            </p>
          </div>
        </li>
      </ul>
    </section>

    <section id="como-doar" class="section section--alt" aria-labelledby="doacoes-title">
      <h2 id="doacoes-title" class="h2">Como Doar</h2>
      <div class="grid mt-24">
        <div class="col-12 col-md-6">
          <img src="assets/images/projeto1.jpg" alt="Voluntários em ação">
        </div>
        <div class="col-12 col-md-6">
          <div class="card">
            <div class="card__body">
              <h3 class="card__title">Campanha: Kits escolares</h3>
              <p>Meta: R$ 10.000 — Progresso: 65%</p>
              <progress value="65" max="100">65%</progress>
              <p class="mt-16">
                <a class="btn btn--primary" href="#/cadastro?interesse=doar">Quero Doar</a>
              </p>
              <p class="mt-16"><strong>Pix:</strong> doacoes@institutoexemplo.org</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
`;

export const Cadastro = () => `
  <section class="section container">
    <h1 class="h1">Faça seu Cadastro</h1>
    <p>Preencha o formulário abaixo para se tornar um voluntário, doador ou receber nossas notícias.</p>
    <div class="alert alert--info mt-16">Campos com <strong>*</strong> são obrigatórios.</div>

    <form id="cadastroForm" class="mt-24" novalidate>
      <div class="grid">
        <div class="col-12 col-md-6">
          <div class="form-control">
            <label for="nome">Nome completo *</label>
            <input class="input" id="nome" name="nome" required minlength="5" autocomplete="name" placeholder="Seu nome completo">
            <small class="help" data-help-for="nome"></small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-control">
            <label for="email">E-mail *</label>
            <input class="input" id="email" name="email" type="email" required placeholder="voce@exemplo.com" autocomplete="email">
            <small class="help" data-help-for="email"></small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-control">
            <label for="cpf">CPF *</label>
            <input class="input" id="cpf" name="cpf" required maxlength="14" placeholder="000.000.000-00">
            <small class="help" data-help-for="cpf"></small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-control">
            <label for="telefone">Telefone *</label>
            <input class="input" id="telefone" name="telefone" required maxlength="16" placeholder="(00) 0 0000-0000">
            <small class="help" data-help-for="telefone"></small>
          </div>
        </div>
      </div>

      <fieldset class="mt-16">
        <legend class="h3">Interesse na ONG</legend>
        <label><input type="checkbox" name="interesse" value="voluntariado"> Voluntariado</label>
        <label class="ml-16"><input type="checkbox" name="interesse" value="doar"> Doar</label>
        <label class="ml-16"><input type="checkbox" name="interesse" value="newsletter" checked> Receber notícias</label>
        <small class="help" data-help-for="interesse"></small>
      </fieldset>

      <div class="mt-24">
        <button class="btn btn--primary" type="submit">Enviar cadastro</button>
        <button class="btn btn--ghost" type="button" id="limpar">Limpar</button>
      </div>
    </form>
  </section>
`;

export const Contato = () => `
  <section class="section container">
    <h1 class="h1">Fale Conosco</h1>
    <p>Telefone: <a href="tel:+5511999999999">+55 (11) 99999-9999</a> — E-mail: <a href="mailto:contato@institutoexemplo.org">contato@institutoexemplo.org</a></p>
    <p class="mt-16"><a class="btn btn--ghost" href="#/">Voltar ao início</a></p>
  </section>
`;

export const NotFound = () => `
  <section class="section container">
    <h1 class="h1">Página não encontrada</h1>
    <p><a class="btn btn--primary" href="#/">Ir para o início</a></p>
  </section>
`;
