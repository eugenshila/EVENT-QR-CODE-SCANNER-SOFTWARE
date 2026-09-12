import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QRCodeSVG } from 'qrcode.react';
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Filter,
  Gauge,
  Globe2,
  History,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Menu,
  MoreHorizontal,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Ticket,
  Upload,
  UserCheck,
  UserRound,
  Users,
  UsersRound,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import './styles.css';

const navGroups = [
  {
    label: 'Workspace',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'events', label: 'Events', icon: CalendarDays },
      { id: 'participants', label: 'Participants', icon: UsersRound, badge: '1,250' },
      { id: 'passes', label: 'QR passes', icon: QrCode },
      { id: 'checkin', label: 'Check-in', icon: ScanIcon },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    label: 'Manage',
    items: [
      { id: 'parishes', label: 'Parishes', icon: Network },
      { id: 'mentors', label: 'Mentors', icon: UserCheck },
      { id: 'stations', label: 'Scanner stations', icon: Smartphone },
      { id: 'users', label: 'Users & roles', icon: ShieldCheck },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'audit', label: 'Audit log', icon: History },
    ],
  },
];

function ScanIcon({ size = 18, strokeWidth = 1.8 }) {
  return <QrCode size={size} strokeWidth={strokeWidth} />;
}

const parishRows = [
  { name: 'St. Joseph Mukasa', short: 'SJM', registered: 52, checked: 48, color: '#e47f58' },
  { name: 'St. Peter & Paul', short: 'SPP', registered: 43, checked: 39, color: '#6c81c4' },
  { name: 'Soweto Parish', short: 'SOW', registered: 31, checked: 30, color: '#d9ae44' },
  { name: 'Holy Family', short: 'HF', registered: 38, checked: 26, color: '#6eaa82' },
  { name: 'Our Lady of Grace', short: 'OLG', registered: 29, checked: 19, color: '#ab75b7' },
];

const participantsSeed = [
  { id: 'BBR-00327', name: 'John Kamau', initials: 'JK', age: 12, type: 'Boy', parish: 'St. Joseph Mukasa', status: 'Approved', check: 'Checked in', qr: 'BBR26-00327-X8K93M', color: '#e47f58' },
  { id: 'BBR-00328', name: 'Liam Otieno', initials: 'LO', age: 13, type: 'Boy', parish: 'St. Peter & Paul', status: 'Approved', check: 'Not checked in', qr: 'BBR26-00328-A2C89L', color: '#6c81c4' },
  { id: 'BBR-00329', name: 'Peter Mwangi', initials: 'PM', age: 11, type: 'Boy', parish: 'Soweto Parish', status: 'Approved', check: 'Checked in', qr: 'BBR26-00329-Q7T31B', color: '#d9ae44' },
  { id: 'BBR-00330', name: 'Brian Ochieng', initials: 'BO', age: 14, type: 'Boy', parish: 'Holy Family', status: 'Pending', check: 'Not checked in', qr: '—', color: '#6eaa82' },
  { id: 'BBR-00331', name: 'Mark Wekesa', initials: 'MW', age: 12, type: 'Boy', parish: 'Our Lady of Grace', status: 'Approved', check: 'Not checked in', qr: 'BBR26-00331-H3N21V', color: '#ab75b7' },
  { id: 'BBR-00332', name: 'David Kiptoo', initials: 'DK', age: 13, type: 'Boy', parish: 'St. Joseph Mukasa', status: 'Approved', check: 'Checked in', qr: 'BBR26-00332-M4P90K', color: '#e47f58' },
  { id: 'BBR-00333', name: 'Mercy Akinyi', initials: 'MA', age: 15, type: 'Mentor', parish: 'St. Peter & Paul', status: 'Approved', check: 'Checked in', qr: 'BBR26-M-0191-F2K8', color: '#6c81c4' },
];

const scanHistory = [
  { name: 'David Kiptoo', parish: 'St. Joseph Mukasa', type: 'BOY', time: '08:43:19', station: 'Gate 1', state: 'success', initials: 'DK', color: '#e47f58' },
  { name: 'Mercy Akinyi', parish: 'St. Peter & Paul', type: 'MENTOR', time: '08:42:51', station: 'Gate 2', state: 'success', initials: 'MA', color: '#6c81c4' },
  { name: 'John Kamau', parish: 'St. Joseph Mukasa', type: 'BOY', time: '08:41:37', station: 'Gate 1', state: 'duplicate', initials: 'JK', color: '#e47f58' },
  { name: 'Unknown credential', parish: 'Not registered', type: '—', time: '08:40:12', station: 'Gate 3', state: 'invalid', initials: '?', color: '#b8b3aa' },
];

const events = [
  { name: 'Beacon Boys Annual Rally 2026', date: '14 Nov 2026', venue: "St. Mary's School", status: 'Active', registered: '1,250', accent: 'coral', desc: 'Annual gathering for boys and mentors from 24 parishes.' },
  { name: 'Beacon Boys Sports Day', date: '22 Aug 2026', venue: 'Kasarani Grounds', status: 'Completed', registered: '984', accent: 'blue', desc: 'A day of friendship, teamwork and healthy competition.' },
  { name: 'Lenten Mentorship Retreat', date: '28 Mar 2027', venue: 'St. Mark Retreat Centre', status: 'Draft', registered: '—', accent: 'gold', desc: 'A focused retreat for parish mentors and coordinators.' },
];

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('Beacon Boys Annual Rally 2026');
  const [toast, setToast] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [passTarget, setPassTarget] = useState(null);

  const notify = (message, tone = 'success') => {
    setToast({ message, tone });
    window.clearTimeout(window.__beaconToast);
    window.__beaconToast = window.setTimeout(() => setToast(null), 2800);
  };

  const selectNav = (id) => {
    setActiveView(id);
    setSidebarOpen(false);
  };

  const title = {
    dashboard: 'Good morning, Sarah',
    events: 'Events',
    participants: 'Participants',
    passes: 'QR passes',
    checkin: 'Event check-in',
    reports: 'Reports & exports',
    parishes: 'Parishes',
    mentors: 'Mentors',
    stations: 'Scanner stations',
    users: 'Users & roles',
    settings: 'Settings',
    audit: 'Audit log',
  }[activeView];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''} ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><span>BB</span><i /></div>
          {!collapsed && <div className="brand-copy"><strong>beacon boys</strong><span>event operations</span></div>}
          <button className="icon-button sidebar-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <div className="sidebar-event">
          <div className="tiny-label">CURRENT EVENT</div>
          <div className="side-event-title"><span className="event-dot" />{!collapsed && <><span>{selectedEvent}</span><ChevronDown size={14} /></>}</div>
          {!collapsed && <div className="side-event-meta"><span className="live-dot" /> Live event · 14 Nov 2026</div>}
        </div>

        <nav className="nav-area">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              {!collapsed && <div className="nav-group-label">{group.label}</div>}
              {group.items.map(({ id, label, icon: Icon, badge }) => (
                <button className={`nav-item ${activeView === id ? 'active' : ''}`} key={id} onClick={() => selectNav(id)} title={collapsed ? label : undefined}>
                  <Icon size={18} strokeWidth={activeView === id ? 2.2 : 1.8} />
                  {!collapsed && <><span>{label}</span>{badge && <em>{badge}</em>}</>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {!collapsed && <div className="sidebar-bottom">
          <div className="sync-card">
            <div className="sync-icon"><Zap size={15} fill="currentColor" /></div>
            <div><strong>All systems online</strong><span>Last synced just now</span></div>
            <CheckCircle2 size={15} className="sync-check" />
          </div>
          <div className="user-mini">
            <div className="avatar avatar-sarah">SC</div>
            <div className="user-mini-copy"><strong>Sarah Chebet</strong><span>Super administrator</span></div>
            <button className="icon-button" onClick={() => setShowProfile(!showProfile)}><MoreHorizontal size={17} /></button>
          </div>
        </div>}
      </aside>

      {sidebarOpen && <button className="mobile-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu icon-button" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
            <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{activeView === 'dashboard' ? 'Overview' : title}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="connection-pill"><span className="live-dot" /> <span className="online-word">Online</span><span className="sync-separator" /> <span>Synced 12s ago</span></div>
            <button className="icon-button notification-button" onClick={() => notify('You are all caught up')} aria-label="Notifications"><Bell size={19} /><i /></button>
            <div className="profile-wrap">
              <button className="top-profile" onClick={() => setShowProfile(!showProfile)}><span className="avatar avatar-sarah">SC</span><span className="profile-name">Sarah C.</span><ChevronDown size={14} /></button>
              {showProfile && <div className="profile-menu"><div className="profile-menu-head"><span className="avatar avatar-sarah">SC</span><div><strong>Sarah Chebet</strong><span>Super administrator</span></div></div><button onClick={() => notify('Profile settings are ready')}><UserRound size={15} /> My profile</button><button onClick={() => notify('You have been safely signed out', 'neutral')}><LogOut size={15} /> Sign out</button></div>}
            </div>
          </div>
        </header>

        <div className="page-wrap">
          {activeView === 'dashboard' && <Dashboard onNavigate={selectNav} notify={notify} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} eventOpen={eventOpen} setEventOpen={setEventOpen} setPassTarget={setPassTarget} />}
          {activeView === 'events' && <EventsView notify={notify} onNavigate={selectNav} />}
          {activeView === 'participants' && <ParticipantsView notify={notify} setPassTarget={setPassTarget} />}
          {activeView === 'passes' && <PassesView notify={notify} setPassTarget={setPassTarget} />}
          {activeView === 'checkin' && <CheckinView notify={notify} />}
          {activeView === 'reports' && <ReportsView notify={notify} />}
          {(activeView === 'parishes' || activeView === 'mentors' || activeView === 'stations' || activeView === 'users' || activeView === 'settings' || activeView === 'audit') && <UtilityView kind={activeView} notify={notify} />}
        </div>
      </main>

      {passTarget && <PassModal participant={passTarget} onClose={() => setPassTarget(null)} notify={notify} />}
      {toast && <div className={`toast toast-${toast.tone}`}><span>{toast.tone === 'success' ? <CheckCircle2 size={17} /> : toast.tone === 'neutral' ? <Bell size={17} /> : <AlertTriangle size={17} />}</span>{toast.message}<button onClick={() => setToast(null)}><X size={15} /></button></div>}
    </div>
  );
}

function PageHeader({ eyebrow, title, description, children }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div><div className="page-header-actions">{children}</div></div>;
}

function Dashboard({ onNavigate, notify, selectedEvent, setSelectedEvent, eventOpen, setEventOpen, setPassTarget }) {
  return <>
    <PageHeader eyebrow="Saturday · 14 November 2026" title="Good morning, Sarah" description="Here is what's happening with your event today.">
      <div className="event-picker-wrap">
        <button className="event-picker" onClick={() => setEventOpen(!eventOpen)}><span className="event-picker-icon"><CalendarDays size={16} /></span><span><small>VIEWING EVENT</small><strong>{selectedEvent}</strong></span><ChevronDown size={16} /></button>
        {eventOpen && <div className="event-picker-menu"><button onClick={() => { setSelectedEvent('Beacon Boys Annual Rally 2026'); setEventOpen(false); }}>Beacon Boys Annual Rally 2026 <Check size={14} /></button><button onClick={() => { setSelectedEvent('Beacon Boys Sports Day'); setEventOpen(false); }}>Beacon Boys Sports Day</button></div>}
      </div>
      <button className="button button-primary" onClick={() => onNavigate('checkin')}><QrCode size={17} /> Open check-in</button>
    </PageHeader>

    <div className="status-banner"><div className="status-banner-icon"><Activity size={20} /></div><div><strong>Annual Rally is live</strong><span>Registration is closed · Scanning is active across 3 stations</span></div><div className="status-banner-right"><span><i className="live-dot" /> 3 stations online</span><button onClick={() => onNavigate('stations')}>Manage stations <ArrowRight size={14} /></button></div></div>

    <section className="metric-grid">
      <MetricCard label="Registered participants" value="1,250" change="12.4%" detail="vs. last event" icon={UsersRound} accent="coral" />
      <MetricCard label="Checked in" value="932" change="74.6%" detail="of all registrations" icon={ClipboardCheck} accent="teal" progress={74.6} />
      <MetricCard label="Awaiting approval" value="38" change="Needs review" detail="before passes can print" icon={Clock3} accent="gold" alert />
      <MetricCard label="Parishes attending" value="24" change="+3" detail="from 21 last event" icon={Network} accent="blue" />
    </section>

    <div className="dashboard-grid-top">
      <section className="card attendance-card">
        <div className="card-head"><div><div className="card-kicker"><span className="live-dot" /> LIVE ATTENDANCE</div><h2>Check-in progress</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div>
        <div className="attendance-content">
          <div className="donut-wrap"><div className="donut"><div className="donut-inner"><strong>74.6<span>%</span></strong><small>checked in</small></div></div><div className="donut-legend"><span><i className="legend-dot coral" /> Checked in <b>932</b></span><span><i className="legend-dot pale" /> Remaining <b>318</b></span></div></div>
          <div className="chart-area"><div className="chart-topline"><span>Arrivals by hour</span><span>08:00 — 10:00</span></div><div className="bar-chart">{[16, 29, 46, 40, 63, 78, 66, 53, 38, 27, 19, 12].map((height, index) => <div className="bar-column" key={index}><div className={`chart-bar ${index > 7 ? 'muted' : ''}`} style={{ height: `${height}%` }} />{[0, 3, 6, 9].includes(index) && <small>{['08:00', '08:30', '09:00', '09:30'][[0, 3, 6, 9].indexOf(index)]}</small>}</div>)}</div><div className="chart-note"><span className="pulse-line" /> <strong>Peak arrival</strong> was between 08:30 and 09:00</div></div>
        </div>
        <div className="card-footer-link"><button onClick={() => onNavigate('reports')}>View live attendance report <ArrowRight size={15} /></button><span>Updated 12 seconds ago</span></div>
      </section>
      <section className="card quick-card">
        <div className="card-head"><div><div className="card-kicker">TODAY AT A GLANCE</div><h2>Event pulse</h2></div><div className="pulse-badge"><span className="live-dot" /> Live</div></div>
        <div className="pulse-list">
          <PulseRow icon={UserRound} label="Boys checked in" value="842" meta="76.8% of boys" color="coral" />
          <PulseRow icon={UserCheck} label="Mentors checked in" value="90" meta="58.4% of mentors" color="blue" />
          <PulseRow icon={AlertTriangle} label="Rejected scans" value="7" meta="2 this hour" color="gold" />
          <PulseRow icon={Smartphone} label="Manual check-ins" value="12" meta="1.0% of total" color="teal" />
        </div>
        <button className="outline-button full-width" onClick={() => onNavigate('checkin')}><ScanIcon size={16} /> Go to check-in screen</button>
      </section>
    </div>

    <div className="dashboard-grid-bottom">
      <section className="card table-card">
        <div className="card-head"><div><div className="card-kicker">ATTENDANCE BY PARISH</div><h2>Where everyone is coming from</h2></div><button className="text-button" onClick={() => onNavigate('reports')}>See full report <ArrowRight size={14} /></button></div>
        <div className="table-scroll"><table><thead><tr><th>Parish</th><th>Registered</th><th>Checked in</th><th>Missing</th><th className="progress-col" /></tr></thead><tbody>{parishRows.map((row) => <tr key={row.name}><td><div className="parish-cell"><span className="parish-avatar" style={{ background: row.color }}>{row.short.slice(0, 2)}</span><strong>{row.name}</strong></div></td><td>{row.registered}</td><td><strong>{row.checked}</strong></td><td><span className={`missing-number ${row.registered - row.checked < 3 ? 'low' : ''}`}>{row.registered - row.checked}</span></td><td className="progress-col"><div className="table-progress"><span style={{ width: `${(row.checked / row.registered) * 100}%`, background: row.color }} /></div><small>{Math.round(row.checked / row.registered * 100)}%</small></td></tr>)}</tbody></table></div>
        <div className="table-foot"><span><i className="small-live" /> Attendance updates in real time</span><button onClick={() => notify('Parish attendance CSV is ready to download')}><Download size={14} /> Export CSV</button></div>
      </section>
      <section className="card activity-card">
        <div className="card-head"><div><div className="card-kicker">RECENT ACTIVITY</div><h2>Latest scans</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div>
        <div className="activity-list">{scanHistory.slice(0, 4).map((scan) => <ActivityRow key={scan.time} scan={scan} />)}</div>
        <button className="view-all-button" onClick={() => onNavigate('checkin')}>View all scan activity <ArrowRight size={15} /></button>
      </section>
    </div>

    <div className="dashboard-footer-note"><div className="footer-note-icon"><ShieldCheck size={17} /></div><span><strong>Child data protected.</strong> Sensitive contact and medical information is restricted by role. All scans are recorded in the audit log.</span><button onClick={() => onNavigate('audit')}>View audit log <ArrowRight size={14} /></button></div>
  </>;
}

function MetricCard({ label, value, change, detail, icon: Icon, accent, progress, alert }) {
  return <div className={`metric-card metric-${accent}`}><div className="metric-top"><div className="metric-label">{label}</div><div className="metric-icon"><Icon size={18} /></div></div><div className="metric-value-row"><strong>{value}</strong>{progress && <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>}</div><div className={`metric-meta ${alert ? 'meta-alert' : ''}`}><span>{change}</span><small>{detail}</small></div></div>;
}

function PulseRow({ icon: Icon, label, value, meta, color }) {
  return <div className="pulse-row"><div className={`pulse-icon pulse-${color}`}><Icon size={17} /></div><div className="pulse-copy"><strong>{label}</strong><span>{meta}</span></div><b>{value}</b></div>;
}

function ActivityRow({ scan }) {
  const icon = scan.state === 'success' ? <Check size={14} /> : scan.state === 'duplicate' ? <RefreshCw size={13} /> : <X size={14} />;
  return <div className="activity-row"><div className={`activity-avatar state-${scan.state}`} style={scan.state === 'success' ? { background: scan.color } : {}}>{scan.state === 'success' ? scan.initials : icon}</div><div className="activity-copy"><strong>{scan.name}</strong><span>{scan.parish} · {scan.type}</span></div><div className="activity-time"><strong>{scan.time}</strong><span className={`activity-state ${scan.state}`}>{scan.state === 'success' ? 'Verified' : scan.state === 'duplicate' ? 'Duplicate' : 'Invalid'}</span></div></div>;
}

function EventsView({ notify, onNavigate }) {
  return <><PageHeader eyebrow="EVENT MANAGEMENT" title="Events" description="Create, configure and follow every Beacon Boys gathering."><button className="button button-primary" onClick={() => notify('New event form opened')}><Plus size={17} /> Create event</button></PageHeader><div className="event-summary-row"><div className="summary-box"><span className="summary-box-icon teal"><CalendarDays size={18} /></span><div><small>All events</small><strong>12</strong></div></div><div className="summary-box"><span className="summary-box-icon coral"><Activity size={18} /></span><div><small>Active now</small><strong>1</strong></div></div><div className="summary-box"><span className="summary-box-icon gold"><Clock3 size={18} /></span><div><small>Draft events</small><strong>3</strong></div></div><div className="summary-box"><span className="summary-box-icon blue"><Archive size={18} /></span><div><small>Completed</small><strong>8</strong></div></div></div><div className="event-list">{events.map((event) => <div className="event-list-card" key={event.name}><div className={`event-color-block ${event.accent}`}><CalendarDays size={22} /><span>{event.date.split(' ')[1]}</span><small>{event.date.split(' ')[0]}</small></div><div className="event-info"><div className="event-title-row"><h2>{event.name}</h2><StatusPill status={event.status} /></div><p>{event.desc}</p><div className="event-meta-row"><span><CalendarDays size={14} /> {event.date}</span><span><Globe2 size={14} /> {event.venue}</span><span><Users size={14} /> {event.registered} registered</span></div></div><div className="event-actions"><button className="icon-button" onClick={() => notify(`${event.name} opened`)}><MoreHorizontal size={18} /></button><button className="outline-button" onClick={() => event.status === 'Active' ? onNavigate('dashboard') : notify('Event overview opened')}>{event.status === 'Active' ? 'Open event' : 'View event'} <ArrowRight size={14} /></button></div></div>)}</div></>;
}

function StatusPill({ status }) {
  const className = status.toLowerCase().replace(' ', '-');
  return <span className={`status-pill status-${className}`}><i />{status}</span>;
}

function ParticipantsView({ notify, setPassTarget }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All participants');
  const [selected, setSelected] = useState([]);
  const list = useMemo(() => participantsSeed.filter((person) => {
    const matchesQuery = `${person.name} ${person.id} ${person.parish}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All participants' || (filter === 'Awaiting approval' ? person.status === 'Pending' : filter === 'Checked in' ? person.check === 'Checked in' : person.type === filter);
    return matchesQuery && matchesFilter;
  }), [query, filter]);
  const toggleAll = () => setSelected(selected.length === list.length ? [] : list.map((p) => p.id));
  const toggleOne = (id) => setSelected(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  return <><PageHeader eyebrow="EVENT REGISTRATIONS · 1,250 TOTAL" title="Participants" description="Review registration status, passes and attendance for Annual Rally 2026."><button className="outline-button" onClick={() => notify('Participant import template downloaded')}><Download size={16} /> Import list</button><button className="button button-primary" onClick={() => notify('Add participant form opened')}><Plus size={17} /> Add participant</button></PageHeader><div className="participant-overview"><div><strong>1,096</strong><span>Boys</span></div><div><strong>154</strong><span>Mentors</span></div><div><strong>1,212</strong><span>Approved</span></div><div><strong>38</strong><span>Awaiting approval</span></div><div className="overview-spacer" /><button className="soft-button" onClick={() => notify('Bulk approval queue opened')}><FileCheck2 size={16} /> Review approvals <b>38</b></button></div><section className="card participant-card"><div className="filter-toolbar"><div className="search-field"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, ID or parish..." /></div><div className="filter-select"><Filter size={15} /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All participants</option><option>Boy</option><option>Mentor</option><option>Checked in</option><option>Awaiting approval</option></select><ChevronDown size={14} /></div><button className="filter-button"><SlidersHorizontal size={16} /> More filters <span>2</span></button><div className="toolbar-end"><button className="icon-button"><ListFilter size={18} /></button><button className="icon-button"><MoreHorizontal size={18} /></button></div></div>{selected.length > 0 && <div className="bulk-bar"><span><strong>{selected.length}</strong> selected</span><button onClick={() => { notify(`${selected.length} registrations approved`); setSelected([]); }}><Check size={15} /> Approve</button><button onClick={() => notify('Pass generation started')}><QrCode size={15} /> Generate passes</button><button onClick={() => notify('Export prepared')}><Download size={15} /> Export</button><button className="bulk-clear" onClick={() => setSelected([])}><X size={15} /></button></div>}<div className="table-scroll"><table className="participant-table"><thead><tr><th className="check-col"><input type="checkbox" checked={selected.length === list.length && list.length > 0} onChange={toggleAll} /></th><th>Participant</th><th>Type</th><th>Parish</th><th>Registration</th><th>Check-in</th><th>Credential</th><th /></tr></thead><tbody>{list.map((person) => <tr key={person.id}><td className="check-col"><input type="checkbox" checked={selected.includes(person.id)} onChange={() => toggleOne(person.id)} /></td><td><div className="participant-cell"><span className="person-avatar" style={{ background: person.color }}>{person.initials}</span><span><strong>{person.name}</strong><small>{person.id} · Age {person.age}</small></span></div></td><td><span className={`type-badge type-${person.type.toLowerCase()}`}>{person.type}</span></td><td>{person.parish}</td><td><span className={`registration-status ${person.status.toLowerCase()}`}><i />{person.status}</span></td><td><span className={`check-status ${person.check === 'Checked in' ? 'done' : ''}`}>{person.check === 'Checked in' ? <Check size={13} /> : <span className="empty-dot" />}{person.check}</span></td><td>{person.qr !== '—' ? <span className="credential-id"><QrCode size={13} /> {person.qr.slice(0, 10)}…</span> : <span className="muted">Not generated</span>}</td><td><button className="row-more" onClick={() => person.qr !== '—' ? setPassTarget(person) : notify('Passes are available after approval')}><MoreHorizontal size={17} /></button></td></tr>)}{list.length === 0 && <tr><td colSpan="8"><div className="empty-state"><Search size={28} /><strong>No participants found</strong><span>Try a different search or filter.</span></div></td></tr>}</tbody></table></div><div className="pagination"><span>Showing <strong>1–{list.length}</strong> of 1,250 participants</span><div><button className="pagination-button"><ArrowLeft size={15} /></button><button className="pagination-button active">1</button><button className="pagination-button">2</button><button className="pagination-button">3</button><span>…</span><button className="pagination-button">125</button><button className="pagination-button"><ArrowRight size={15} /></button></div></div></section></>;
}

function PassesView({ notify, setPassTarget }) {
  const [passFilter, setPassFilter] = useState('All passes');
  const passPeople = participantsSeed.filter((p) => p.qr !== '—').filter((p) => passFilter === 'All passes' || p.type === passFilter);
  return <><PageHeader eyebrow="PRINT CENTRE · 1,212 READY" title="QR passes" description="Generate, preview and print secure event passes for approved participants."><button className="outline-button" onClick={() => notify('PDF export is being prepared')}><Download size={16} /> Export PDF</button><button className="button button-primary" onClick={() => notify('Pass generation started for 1,212 approved participants')}><QrCode size={17} /> Generate passes</button></PageHeader><div className="pass-control-strip"><div className="pass-count"><span className="pass-count-icon"><Ticket size={19} /></span><div><strong>1,212 passes ready</strong><small>All approved registrations have a secure credential</small></div></div><div className="pass-actions"><button className="outline-button" onClick={() => notify('Print dialog opened for all approved passes')}><Printer size={16} /> Print all</button><button className="soft-button" onClick={() => notify('Parish pass selection opened')}><Network size={16} /> Print by parish</button></div></div><div className="pass-toolbar"><div className="pass-tabs"><button className={passFilter === 'All passes' ? 'active' : ''} onClick={() => setPassFilter('All passes')}>All passes <b>1,212</b></button><button className={passFilter === 'Boy' ? 'active' : ''} onClick={() => setPassFilter('Boy')}>Boys <b>1,096</b></button><button className={passFilter === 'Mentor' ? 'active' : ''} onClick={() => setPassFilter('Mentor')}>Mentors <b>116</b></button></div><div className="pass-layout-tools"><span>Layout</span><button className="layout-button active"><span className="layout-grid four" /><small>4 / A4</small></button><button className="layout-button"><span className="layout-grid one" /><small>1 / page</small></button></div></div><div className="pass-grid">{passPeople.slice(0, 6).map((person) => <PassCard key={person.id} person={person} onOpen={() => setPassTarget(person)} onPrint={() => notify(`Printing pass for ${person.name}`)} />)}</div><div className="pass-bottom-note"><ShieldCheck size={17} /><span>QR codes contain an encrypted event credential only. No personal or medical data is stored in the code.</span><button onClick={() => notify('Security settings opened')}>Learn about pass security <ArrowRight size={14} /></button></div></>;
}

function PassCard({ person, onOpen, onPrint }) {
  return <div className={`pass-card ${person.type === 'Mentor' ? 'mentor-pass' : ''}`}><div className="pass-card-head"><div className="pass-brand"><span className="mini-mark">BB</span><span>BEACON BOYS</span></div><span className="pass-type">{person.type.toUpperCase()}</span></div><div className="pass-card-body"><div className="pass-person"><span className="pass-label">ANNUAL RALLY 2026</span><h3>{person.name}</h3><p>{person.type === 'Mentor' ? 'Parish mentor' : `Age ${person.age} years`} · {person.parish}</p><span className="pass-id">{person.id}</span></div><div className="qr-frame"><QRCodeSVG value={`https://checkin.beaconboys.org/v/BBR26-${person.id}`} size={82} bgColor="#ffffff" fgColor="#173b38" level="M" /><span>Scan to verify</span></div></div><div className="pass-card-foot"><span><CalendarDays size={12} /> 14 NOV 2026 · ST. MARY'S SCHOOL</span><div><button onClick={onOpen}><MoreHorizontal size={16} /></button><button onClick={onPrint}><Printer size={14} /></button></div></div></div>;
}

function CheckinView({ notify }) {
  const [scanValue, setScanValue] = useState('');
  const [result, setResult] = useState(null);
  const [station, setStation] = useState('Gate 1');
  const [cameraOn, setCameraOn] = useState(false);
  const [online, setOnline] = useState(true);
  const inputRef = useRef(null);
  const processScan = (value) => {
    const code = (value || scanValue).trim();
    if (!code) return;
    const isWrong = code.toLowerCase().includes('wrong');
    const isDuplicate = code.toLowerCase().includes('dup') || code.includes('00327');
    const isInvalid = code.toLowerCase().includes('invalid') || code.toLowerCase().includes('unknown');
    if (isWrong) setResult({ state: 'wrong', title: 'Wrong event', message: 'This credential belongs to another event.', name: 'Beacon Boys Sports Day', detail: 'Current event · Annual Rally 2026' });
    else if (isInvalid) setResult({ state: 'invalid', title: 'Registration not found', message: 'This QR code is not registered for this event.', name: 'Unknown credential', detail: 'Search the participant manually to verify.' });
    else if (isDuplicate) setResult({ state: 'duplicate', title: 'Already checked in', message: 'This participant has already entered the event.', name: 'John Kamau', detail: 'First check-in · 08:34 AM · Gate 1' });
    else setResult({ state: 'success', title: 'Registration verified', message: 'Check-in recorded successfully.', name: code ? 'David Kiptoo' : 'David Kiptoo', detail: 'Age 13 · St. Joseph Mukasa', type: 'BOY', time: '08:44:02' });
    setScanValue('');
    if (!isWrong && !isDuplicate && !isInvalid) window.setTimeout(() => setResult(null), 2200);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  };
  return <><PageHeader eyebrow="FAST ENTRY MODE · ACTIVE EVENT" title="Event check-in" description="Scan a pass, verify registration and keep the line moving."><button className={`online-mode ${online ? '' : 'offline'}`} onClick={() => { setOnline(!online); notify(online ? 'Offline mode enabled — scans will sync when connection returns' : 'Back online — pending scans will sync now', online ? 'warning' : 'success'); }}><span className="live-dot" /> {online ? 'Online mode' : 'Offline mode'} <ChevronDown size={14} /></button><button className="button button-primary" onClick={() => notify('Manual participant search opened')}><Search size={16} /> Manual search</button></PageHeader><div className="checkin-context"><div><span className="context-label">CHECKING IN TO</span><strong><span className="event-dot" /> Beacon Boys Annual Rally 2026</strong><span>14 November 2026 · St. Mary's School</span></div><div className="station-select"><span>STATION</span><select value={station} onChange={(e) => setStation(e.target.value)}><option>Gate 1</option><option>Gate 2</option><option>Gate 3</option><option>VIP / Officials Desk</option></select><ChevronDown size={14} /></div></div><div className="checkin-layout"><section className="card scanner-card"><div className="scanner-card-head"><div><div className="card-kicker">SCAN NEXT PARTICIPANT</div><h2>Ready for the next pass</h2></div><div className="scanner-controls"><button className={`control-toggle ${cameraOn ? 'active' : ''}`} onClick={() => setCameraOn(!cameraOn)}><Smartphone size={15} /> {cameraOn ? 'Camera on' : 'Use camera'}</button><button className="icon-button"><MoreHorizontal size={18} /></button></div></div><div className={`scanner-stage ${cameraOn ? 'camera-active' : ''}`} onClick={() => inputRef.current?.focus()}>{cameraOn ? <><div className="camera-placeholder"><div className="camera-grid" /><span className="camera-label"><Smartphone size={15} /> Camera preview · tap to scan</span></div><div className="scan-frame camera-frame"><i /><i /><i /><i /><span>Place QR inside the frame</span></div></> : <><div className="scanner-rings"><div className="scanner-ring"><QrCode size={40} /></div></div><div className="scan-stage-copy"><strong>Scan or enter a QR credential</strong><span>Use a phone camera, PDA, or USB scanner</span></div></>}</div><div className="keyboard-input"><div className="input-with-icon"><QrCode size={17} /><input ref={inputRef} autoFocus value={scanValue} onChange={(e) => setScanValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && processScan()} placeholder="Scanner input is focused and ready..." /><span className="input-ready"><i /> Ready</span></div><button className="button button-primary" onClick={() => processScan()}>Verify <ArrowRight size={15} /></button></div><div className="scanner-hints"><span><Zap size={14} /> Scanner will submit on Enter</span><span><ShieldCheck size={14} /> Secure database verification</span><span><Volume2Icon /> Sound on</span></div></section><section className="card verification-card"><div className="card-head"><div><div className="card-kicker">VERIFICATION RESULT</div><h2>{result ? 'Latest scan' : 'Nothing scanned yet'}</h2></div>{result && <button className="clear-result" onClick={() => setResult(null)}><X size={15} /> Clear</button>}</div>{result ? <ScanResult result={result} onManual={() => notify('Manual search opened')} /> : <div className="no-result"><div className="no-result-icon"><QrCode size={28} /></div><strong>Scan a participant to begin</strong><p>Their name, parish and registration status will appear here for quick verification.</p><div className="demo-buttons"><button onClick={() => processScan('BBR26-00332-M4P90K')}><Sparkles size={14} /> Try a valid scan</button><button onClick={() => processScan('DUP-00327')}>Try duplicate</button><button onClick={() => processScan('INVALID-CODE')}>Try invalid</button></div></div>}<div className="verification-footer"><span><i className="live-dot" /> Live connection</span><span>Station {station}</span><button onClick={() => notify('Scanner settings opened')}><Settings size={14} /></button></div></section></div><section className="card scan-history-card"><div className="card-head"><div><div className="card-kicker">THIS SESSION · {scanHistory.length + (result ? 1 : 0)} SCANS</div><h2>Recent scan activity</h2></div><button className="text-button" onClick={() => notify('Full scan log opened')}>View full log <ArrowRight size={14} /></button></div><div className="session-stats"><span><b className="green-text">{result?.state === 'success' ? 1 : 0}</b> successful just now</span><span><b>08:00:12</b> session started</span><span><b>{station}</b> current station</span><span className="sound-setting"><Volume2Icon /> Sound & vibration <button className="switch on"><i /></button></span></div></section></>;
}

function ScanResult({ result, onManual }) {
  const config = {
    success: { icon: CheckCircle2, label: 'VERIFIED', className: 'success' },
    duplicate: { icon: AlertTriangle, label: 'DUPLICATE', className: 'duplicate' },
    invalid: { icon: XCircle, label: 'NOT FOUND', className: 'invalid' },
    wrong: { icon: AlertTriangle, label: 'WRONG EVENT', className: 'wrong' },
  }[result.state];
  const Icon = config.icon;
  return <div className={`scan-result result-${config.className}`}><div className="result-banner"><Icon size={22} /><strong>{result.title}</strong><span>{config.label}</span></div><div className="result-person"><div className="result-avatar">{result.state === 'success' ? 'DK' : result.state === 'duplicate' ? 'JK' : <QrCode size={25} />}</div><div><span className="result-type">{result.type || 'CREDENTIAL ALERT'}</span><h3>{result.name}</h3><p>{result.detail}</p></div></div><div className="result-message">{result.message}</div>{result.state === 'success' ? <div className="result-time"><Clock3 size={14} /> Checked in at <strong>{result.time}</strong><span>via QR scan · {result.state === 'success' ? 'Gate 1' : ''}</span></div> : <button className="result-action" onClick={onManual}><Search size={15} /> Search participant manually <ArrowRight size={14} /></button>}</div>;
}

function Volume2Icon() { return <span className="volume-icon"><span /><span /><span /></span>; }

function ReportsView({ notify }) {
  return <><PageHeader eyebrow="INSIGHTS · ANNUAL RALLY 2026" title="Reports & exports" description="Turn event activity into clear, shareable attendance reports."><button className="outline-button" onClick={() => notify('Report builder opened')}><SlidersHorizontal size={16} /> Custom report</button><button className="button button-primary" onClick={() => notify('Attendance report PDF is ready')}><Download size={16} /> Export report</button></PageHeader><div className="report-highlight"><div className="report-highlight-copy"><div className="eyebrow">EVENT ATTENDANCE</div><h2>932 <small>/ 1,250</small></h2><p>participants checked in · <strong>74.6% attendance</strong></p><div className="report-progress"><span /></div><div className="report-highlight-meta"><span>842 boys</span><span>90 mentors</span><span>318 not yet checked in</span></div></div><div className="report-ring"><div><strong>74.6%</strong><span>attendance</span></div></div><div className="report-highlight-actions"><button onClick={() => notify('Missing participants report downloaded')}><Download size={16} /> Missing participants</button><button onClick={() => notify('Parish attendance report opened')}><ArrowRight size={16} /> Parish breakdown</button></div></div><div className="report-grid"><ReportTile icon={ClipboardCheck} title="Check-in report" desc="Every registration, status, timestamp and operator." formats="PDF · XLSX · CSV" color="coral" onClick={() => notify('Check-in report is ready')} /><ReportTile icon={UsersRound} title="Missing participants" desc="Registered boys and mentors who have not arrived." formats="PDF · XLSX" color="gold" onClick={() => notify('Missing participant report is ready')} /><ReportTile icon={BarChart3} title="Parish attendance" desc="Compare turnout across all 24 participating parishes." formats="PDF · XLSX" color="teal" onClick={() => notify('Parish report is ready')} /><ReportTile icon={History} title="Scan audit log" desc="Valid, rejected, duplicate and manual scan attempts." formats="CSV · XLSX" color="blue" onClick={() => notify('Audit export is ready')} /></div><section className="card report-table-card"><div className="card-head"><div><div className="card-kicker">MISSING PARTICIPANTS</div><h2>Registered but not checked in</h2></div><button className="text-button" onClick={() => notify('Missing participant export started')}><Download size={14} /> Export list</button></div><div className="table-scroll"><table><thead><tr><th>Name</th><th>Age</th><th>Parish</th><th>Assigned mentor</th><th>Registration</th></tr></thead><tbody><tr><td><strong>Liam Otieno</strong><small className="table-sub">BBR-00328</small></td><td>13</td><td>St. Peter & Paul</td><td>Peter Ochieng</td><td><span className="registration-status approved"><i /> Approved</span></td></tr><tr><td><strong>Mark Wekesa</strong><small className="table-sub">BBR-00331</small></td><td>12</td><td>Our Lady of Grace</td><td>Agnes Wambui</td><td><span className="registration-status approved"><i /> Approved</span></td></tr><tr><td><strong>Brian Ochieng</strong><small className="table-sub">BBR-00330</small></td><td>14</td><td>Holy Family</td><td>Joseph Njoroge</td><td><span className="registration-status pending"><i /> Pending</span></td></tr></tbody></table></div></section></>;
}

function ReportTile({ icon: Icon, title, desc, formats, color, onClick }) { return <button className="report-tile" onClick={onClick}><span className={`report-icon ${color}`}><Icon size={19} /></span><span className="report-tile-copy"><strong>{title}</strong><span>{desc}</span><small>{formats}</small></span><ArrowRight size={17} /></button>; }

const utilityContent = {
  parishes: { eyebrow: 'DIRECTORY · 24 PARISHES', title: 'Parishes', description: 'Manage parish accounts, coordinators and attendance history.', icon: Network, primary: 'Add parish', stats: [['24', 'Active parishes'], ['1,096', 'Boys'], ['154', 'Mentors']], rows: [['St. Joseph Mukasa', 'Nairobi East', '52 registered', 'Active'], ['St. Peter & Paul', 'Nairobi Central', '43 registered', 'Active'], ['Soweto Parish', 'Nairobi South', '31 registered', 'Active'], ['Holy Family', 'Nairobi West', '38 registered', 'Active']] },
  mentors: { eyebrow: 'PEOPLE · 154 MENTORS', title: 'Mentors', description: 'Coordinate parish mentors and assign event responsibilities.', icon: UserCheck, primary: 'Add mentor', stats: [['154', 'All mentors'], ['116', 'Event passes'], ['24', 'Parishes represented']], rows: [['Mercy Akinyi', 'St. Peter & Paul', 'Parish Coordinator', 'Active'], ['Peter Ochieng', 'St. Peter & Paul', 'Mentor', 'Active'], ['Agnes Wambui', 'Our Lady of Grace', 'Parish Coordinator', 'Active'], ['Joseph Njoroge', 'Holy Family', 'Mentor', 'Pending']] },
  stations: { eyebrow: 'EVENT OPERATIONS · 3 ONLINE', title: 'Scanner stations', description: 'Configure gates, operators and the devices keeping check-in moving.', icon: Smartphone, primary: 'Add station', stats: [['3', 'Online now'], ['4', 'Configured'], ['08:00', 'Session started']], rows: [['Gate 1', 'Main entrance', 'Sarah Chebet · 312 scans', 'Online'], ['Gate 2', 'East entrance', 'Peter Njoroge · 287 scans', 'Online'], ['Gate 3', 'Bus arrival', 'Grace Wanjiku · 333 scans', 'Online'], ['VIP / Officials Desk', 'Main hall', 'No operator assigned', 'Offline']] },
  users: { eyebrow: 'ACCESS CONTROL · 18 USERS', title: 'Users & roles', description: 'Keep access to participant information safe and intentional.', icon: ShieldCheck, primary: 'Invite user', stats: [['18', 'Active users'], ['5', 'Role types'], ['24', 'Audit events today']], rows: [['Sarah Chebet', 'Super Administrator', 'All events · All parishes', 'Active'], ['Peter Njoroge', 'Event Administrator', 'Annual Rally 2026', 'Active'], ['Mercy Akinyi', 'Parish Mentor', 'St. Peter & Paul', 'Active'], ['Grace Wanjiku', 'Check-in Officer', 'Gate 3', 'Active']] },
  settings: { eyebrow: 'SYSTEM CONFIGURATION', title: 'Settings', description: 'Configure security, event defaults and data protection.', icon: Settings, primary: 'Save changes', stats: [['30 min', 'Session timeout'], ['HTTPS', 'Transport security'], ['Daily', 'Database backup']], rows: [['Registration workflow', 'Approval required before pass generation', 'Event defaults', 'Configured'], ['Scanner experience', 'Sound, vibration and automatic next scan', 'Check-in defaults', 'Configured'], ['Data retention', 'Minor participant data retained for 24 months', 'Privacy policy', 'Review'], ['Offline verification', 'Encrypted event dataset available to stations', 'Sync status', 'Ready']] },
  audit: { eyebrow: 'SECURITY · LIVE LOG', title: 'Audit log', description: 'A transparent record of changes, approvals and scan activity.', icon: History, primary: 'Export log', stats: [['1,842', 'Events recorded'], ['7', 'Rejected scans'], ['0', 'Unresolved alerts']], rows: [['08:43:19', 'QR scan verified', 'David Kiptoo · BBR-00332', 'Gate 1 · Sarah Chebet'], ['08:42:51', 'QR scan verified', 'Mercy Akinyi · BBR-M-0191', 'Gate 2 · Peter Njoroge'], ['08:41:37', 'Duplicate scan', 'John Kamau · BBR-00327', 'Gate 1 · Sarah Chebet'], ['08:40:12', 'Invalid credential', 'Unknown QR credential', 'Gate 3 · Grace Wanjiku']] },
};

function UtilityView({ kind, notify }) {
  const content = utilityContent[kind];
  const Icon = content.icon;
  return <><PageHeader eyebrow={content.eyebrow} title={content.title} description={content.description}><button className="outline-button" onClick={() => notify(`${content.title} import template downloaded`)}><Download size={16} /> Export</button><button className="button button-primary" onClick={() => notify(`${content.primary} form opened`)}><Plus size={17} /> {content.primary}</button></PageHeader><div className="utility-stat-row">{content.stats.map(([value, label], index) => <div className="utility-stat" key={label}><span className={`utility-stat-icon u-${index}`}><Icon size={17} /></span><div><strong>{value}</strong><small>{label}</small></div></div>)}</div><section className="card utility-table-card"><div className="filter-toolbar"><div className="search-field"><Search size={17} /><input placeholder={`Search ${content.title.toLowerCase()}...`} /></div><button className="filter-button"><Filter size={16} /> Filters</button><div className="toolbar-end"><button className="icon-button"><MoreHorizontal size={18} /></button></div></div><div className="table-scroll"><table><thead><tr>{kind === 'audit' ? <><th>Time</th><th>Action</th><th>Subject</th><th>Actor / device</th></> : <><th>Name / item</th><th>Parish / location</th><th>Details</th><th>Status</th><th /></>}</tr></thead><tbody>{content.rows.map((row, idx) => <tr key={idx}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cellIndex === 0 && kind !== 'audit' ? <div className="utility-name"><span className="utility-round"><Icon size={15} /></span><strong>{cell}</strong></div> : cellIndex === row.length - 1 && kind !== 'settings' ? <StatusPill status={cell} /> : <span>{cell}</span>}</td>)}{kind !== 'audit' && <td><button className="row-more"><MoreHorizontal size={17} /></button></td>}</tr>)}</tbody></table></div><div className="pagination"><span>Showing <strong>1–{content.rows.length}</strong> of {content.stats[0][0]} records</span><div><button className="pagination-button active">1</button><button className="pagination-button">2</button><button className="pagination-button"><ArrowRight size={15} /></button></div></div></section><div className="utility-note"><Icon size={17} /><span><strong>Role-based access is active.</strong> {kind === 'parishes' ? 'Parish mentors can only see participants linked to their own parish.' : kind === 'stations' ? 'Every scan is attributed to a station, device and signed-in operator.' : 'Changes and sensitive actions are recorded in the immutable audit log.'}</span></div></>;
}

function PassModal({ participant, onClose, notify }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="pass-modal"><div className="modal-head"><div><div className="eyebrow">PRINT PREVIEW · SECURE CREDENTIAL</div><h2>{participant.type} event pass</h2></div><button className="icon-button" onClick={onClose}><X size={19} /></button></div><div className="modal-preview"><div className={`large-pass ${participant.type === 'Mentor' ? 'mentor-pass' : ''}`}><div className="large-pass-top"><div className="pass-brand"><span className="mini-mark">BB</span><span>BEACON BOYS</span></div><span className="pass-type">{participant.type.toUpperCase()}</span></div><div className="large-pass-content"><div><span className="pass-label">ANNUAL RALLY 2026</span><h3>{participant.name}</h3><p>{participant.type === 'Mentor' ? 'Parish mentor' : `Age ${participant.age} years`} · {participant.parish}</p><div className="large-pass-details"><span>PARTICIPANT NO.<b>{participant.id}</b></span><span>EVENT DATE<b>14 NOV 2026</b></span></div></div><div className="large-qr"><QRCodeSVG value={`https://checkin.beaconboys.org/v/${participant.qr}`} size={156} bgColor="#ffffff" fgColor="#173b38" level="H" /><small>Secure check-in credential</small></div></div><div className="large-pass-bottom"><span><CalendarDays size={13} /> St. Mary's School · Nairobi</span><ShieldCheck size={14} /> Do not share this pass</div></div></div><div className="modal-detail-grid"><div><span>Credential ID</span><strong>{participant.qr}</strong></div><div><span>Status</span><strong className="green-text"><CheckCircle2 size={14} /> Active</strong></div><div><span>Valid for</span><strong>Annual Rally 2026 only</strong></div><div><span>Generated</span><strong>14 Nov 2026 · 07:18</strong></div></div><div className="modal-actions"><button className="outline-button" onClick={() => notify('PDF pass downloaded')}><Download size={16} /> Download PDF</button><button className="button button-primary" onClick={() => { notify(`Printing pass for ${participant.name}`); onClose(); }}><Printer size={16} /> Print pass</button></div></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
