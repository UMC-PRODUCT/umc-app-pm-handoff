const groups = [
  { label: '중앙운영사무국', roles: ['총괄 · 부총괄', '운영국원 · 교육국원'], scope: '중앙 역할과 공지 대상 범위' },
  { label: '지부', roles: ['지부장'], scope: '담당 지부와 기능별 조건' },
  { label: '학교', roles: ['회장 · 부회장', '파트장', '기타 교내 운영진'], scope: '담당 학교 · 파트와 기능별 조건' },
]
const rows = [
  ['챌린저', '—', '—', '—', '—'],
  ['총괄 · 부총괄', '전체 공지', '—', '—', '일정의 해당 기수'],
  ['운영국원 · 교육국원', '학교·지부 미지정 공지', '—', '—', '일정의 해당 기수'],
  ['지부장', '담당 지부 공지¹', '—', '—', '—'],
  ['학교 회장 · 부회장', '담당 학교 공지', '본인 학교', '본인 학교', '일정의 해당 기수'],
  ['학교 파트장 · 기타 운영진', '담당 학교 공지', '본인 학교', '—', '일정의 해당 기수'],
  ['시스템 관리자', '전체 공지', '허용', '허용', '허용'],
]

export default function RolePermissions() {
  return (
    <figure className="permissions-map" aria-labelledby="permissions-caption">
      <figcaption id="permissions-caption"><span>역할과 권한 한눈에 보기</span><p>조직에서 맡은 역할에 대상과 행동의 조건을 더해 권한을 판단합니다.</p></figcaption>
      <div className="generation-map" aria-label="기수 값과 기수 ID의 관계">
        <div><small>사용자 화면</small><strong>기수 값 · gen</strong><span>“11기”처럼 표시하는 번호</span></div>
        <b aria-hidden="true">↔</b>
        <div><small>서버 요청</small><strong>기수 ID · gisuId</strong><span>해당 기수를 찾는 식별자</span></div>
        <p>서로 다른 값일 수 있습니다. 매핑된 ID로 요청하고, 화면에는 기수 값을 표시합니다.</p>
      </div>
      <div className="permissions-root"><strong>하나의 계정, 여러 역할</strong><span>챌린저 활동 이력에 기수·소속별 운영 역할이 더해집니다.</span></div>
      <div className="permissions-branches">
        {groups.map(group => <section className="permissions-branch" key={group.label}>
          <h4>{group.label}</h4><ul>{group.roles.map(role => <li key={role}>{role}</li>)}</ul><p>{group.scope}</p>
        </section>)}
      </div>
      <p className="permissions-separate"><strong>시스템 관리자</strong> 계정에 별도로 부여하는 권한입니다. 조직 역할의 승급 단계와 구분합니다.</p>
      <ol className="permissions-flow" aria-label="권한 판단에 사용하는 조건">
        {['보유 역할', '기수·소속', '공지·일정 등 대상', '조회·수정·승인 행동'].map((label, i) => <li key={label}><small>0{i + 1}</small><span>{label}</span></li>)}
      </ol>
      <div className="permissions-table-scroll" tabIndex={0} role="region" aria-label="주요 관리 행동의 역할별 권한표. 좁은 화면에서는 가로로 스크롤할 수 있습니다.">
        <table className="permissions-table">
          <caption>주요 관리 행동별 허용 범위</caption>
          <thead><tr>{['역할', '공지 확인 현황 관리', '스터디 그룹 관리 조회', '스터디 그룹 생성·수정·삭제', '출석 승인·거절'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
          <tbody>{rows.map(([role, ...cells]) => <tr key={role}><th scope="row">{role}</th>{cells.map((cell, i) => <td key={i} className={cell === '—' ? 'permission-none' : ''}>{cell === '—' ? <span aria-label="이 역할만으로는 허용되지 않음">—</span> : cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="permissions-notes">
        <p><strong>표 읽는 법</strong> 한 가지 역할만 보유했을 때의 관리 권한입니다. ‘—’는 일반 이용이나 다른 역할을 통한 접근까지 금지한다는 뜻이 아닙니다. 챌린저의 내 스터디 조회는 운영진의 그룹 관리 조회와 다릅니다.</p>
        <p>¹ 지부 대상 공지 중 학교가 별도로 지정되지 않은 경우입니다. 공지 관리는 학교 대상 → 지부 대상 → 전체 대상 순으로 범위를 구분합니다. 중앙 총괄단과 시스템 관리자는 전체 공지를 관리할 수 있습니다.</p>
        <p><strong>기수 조건은 기능마다 다릅니다.</strong> 공지 확인 현황 관리와 스터디 그룹 관리에는 다른 기수의 역할도 인정하는 판정이 있습니다. 출석 승인은 일정의 해당 기수에 중앙 또는 학교 운영진 역할이 있어야 합니다. 지부장 역할만으로는 이 승인 조건을 충족하지 않습니다. 실제 일정 목록의 노출 범위는 별도로 적용됩니다.</p>
        <p><strong>수정 권한은 따로 확인합니다.</strong> 공지 수정·삭제는 작성자 또는 시스템 관리자에게 허용됩니다. 확인 현황을 볼 수 있어도 다른 사람의 공지를 수정할 수 있다는 뜻은 아닙니다.</p>
      </div>
    </figure>
  )
}
