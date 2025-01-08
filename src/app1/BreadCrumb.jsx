
function BreadCrumb({path, onClick}) {

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a role="button" onClick={onClick}>
            <i class="bi bi-house-fill"></i>
          </a>
        </li>
        <li className="breadcrumb-item"><a>{path}</a></li>
      </ol>
    </nav>
  )
}

export default BreadCrumb
