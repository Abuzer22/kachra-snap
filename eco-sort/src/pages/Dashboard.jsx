import { loadHistory } from '../lib/storage';
import { toApplicationCategory } from '../constants/categories';
import { usePreferences } from '../context/PreferencesContext';
import { t } from '../i18n/translations';
import CategoryBadge from '../components/CategoryBadge';

export default function Dashboard({ onNavigate }) {
  const { prefs } = usePreferences();
  const tr = (key) => t(prefs.language, key);
  const records = loadHistory();

  const total = records.length;

  const counts = records.reduce((acc, r) => {
    const category = toApplicationCategory(r.category);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const categoryStats = Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: count / total,
    }))
    .sort((a, b) => b.count - a.count);

  const uniqueCategories = categoryStats.length;

  const lastScan = records.length ? records[0] : null;

  // Monday-Sunday activity for the current week
  // eslint-disable-next-line react/purity
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  weekStart.setHours(0, 0, 0, 0);
  const localKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push({
      key: localKey(d),
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      n: 0,
    });
  }
  const dayIndex = Object.fromEntries(days.map((x, i) => [x.key, i]));
  records.forEach((r) => {
    const created = new Date(r.createdAt);
    if (Number.isNaN(created.getTime())) return;
    const key = localKey(created);
    if (dayIndex[key] !== undefined) days[dayIndex[key]].n += 1;
  });
  const weekCount = days.reduce((sum, day) => sum + day.n, 0);
  const dayMax = Math.max(1, ...days.map((d) => d.n));

  const recent = records.slice(0, 6);
  const avgConfidenceByRecent =
    recent.length
      ? recent.reduce((s, r) => s + r.confidence, 0) / recent.length
      : 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">{tr('dashboardTitle')}</h1>
          <p className="text-sm text-secondary">
            {tr('dashboardSubtitle')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate('scan')}
            className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-deep"
          >
            {tr('scanWaste')}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('analytics')}
            className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-charcoal hover:bg-offwhite"
          >
            {tr('viewAnalytics')}
          </button>
        </div>
      </div>

      {total === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-white p-6 text-center">
          <p className="text-charcoal font-medium">{tr('noScans')}</p>
          <p className="mt-1 text-sm text-secondary">
            {tr('noScansHint')}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('scan')}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-deep"
          >
            {tr('scanFirstItem')}
          </button>
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <StatCard label="Total Scans" value={total} />
            <StatCard label="Recyclable" value={counts.recyclable || 0} />
            <StatCard label="Organic" value={counts.organic || 0} />
            <StatCard label="E-Waste" value={counts.ewaste || 0} />
            <StatCard label="Unknown Results" value={counts.unknown || 0} />
          </div>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* {tr('categoryDistribution')} */}
            <div className="rounded-lg border border-border bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-charcoal">
                  {tr('categoryDistribution')}
                </h2>
                <span className="text-xs text-secondary">
                  {uniqueCategories} active
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="flex items-center gap-3">
                    <div className="w-32 shrink-0">
                      <CategoryBadge category={stat.category} />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 overflow-hidden rounded-full bg-offwhite">
                        <div
                          className="h-full rounded-full bg-forest"
                          style={{
                            width: `${Math.max(4, stat.percentage * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="w-16 text-right text-xs text-secondary">
                      {stat.count} · {Math.round(stat.percentage * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-lg border border-border bg-white p-4">
              <h2 className="text-sm font-semibold text-charcoal">
                {tr('recentActivity')}
              </h2>
              <div className="mt-4 flex items-end gap-2 h-28">
                {days.map((day) => (
                  <div
                    key={day.key}
                    className="relative flex h-full flex-1 items-end justify-center"
                  >
                    {day.n > 0 && (
                      <span className="absolute -top-4 text-[10px] font-medium text-charcoal">
                        {day.n}
                      </span>
                    )}
                    <div
                      className="w-full rounded-t bg-forest"
                      style={{
                        height: `${Math.max(4, (day.n / dayMax) * 100)}%`,
                        minHeight: '4px',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1 flex gap-2">
                {days.map((day) => (
                  <span
                    key={day.key}
                    className="flex-1 text-center text-[10px] text-secondary"
                  >
                    {day.label}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-secondary">
                {weekCount} scan{weekCount === 1 ? '' : 's'} recorded this week (Monday-Sunday).
              </p>
            </div>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* {tr('recentScans')} */}
            <div className="rounded-lg border border-border bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-charcoal">
                  {tr('recentScans')}
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('history')}
                  className="text-xs text-forest hover:underline"
                >
                  {tr('viewAll')}
                </button>
              </div>
              <ul className="mt-3 divide-y divide-border">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center gap-3 py-2">
                    {r.thumbnail ? (
                      <img
                        src={r.thumbnail}
                        alt=""
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-offwhite" />
                    )}
                    <div className="min-w-0 flex-1">
                      <CategoryBadge category={r.category} />
                      <p className="mt-1 text-xs text-secondary">
                        {Math.round(r.confidence * 100)}% ·{' '}
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* {tr('topCategories')} and latest scan */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-white p-4">
                <h2 className="text-sm font-semibold text-charcoal">
                  {tr('topCategories')}
                </h2>
                <div className="mt-3 space-y-2">
                  {categoryStats.slice(0, 4).map((stat) => (
                    <div
                      key={stat.category}
                      className="flex items-center justify-between gap-3"
                    >
                      <CategoryBadge category={stat.category} />
                      <div className="flex-1">
                        <div className="h-1.5 overflow-hidden rounded-full bg-offwhite">
                          <div
                            className="h-full rounded-full bg-forest"
                            style={{
                              width: `${Math.max(4, stat.percentage * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-secondary">
                        {Math.round(stat.percentage * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-white p-4">
                <h2 className="text-sm font-semibold text-charcoal">
                  {tr('latestScan')}
                </h2>
                {lastScan ? (
                  <div className="mt-3 flex items-center gap-3">
                    {lastScan.thumbnail ? (
                      <img
                        src={lastScan.thumbnail}
                        alt=""
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-offwhite" />
                    )}
                    <div className="min-w-0">
                      <CategoryBadge category={lastScan.category} />
                      <p className="mt-1 text-xs text-secondary">
                        {Math.round(lastScan.confidence * 100)}% confidence
                      </p>
                      <p className="text-xs text-secondary">
                        {new Date(lastScan.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-secondary">{tr('noScans')}.</p>
                )}
                {recent.length > 0 && (
                  <p className="mt-3 text-xs text-secondary">
                    Average of last {recent.length} scan
                    {recent.length === 1 ? '' : 's'}:{' '}
                    {Math.round(avgConfidenceByRecent * 100)}%
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="mt-6 rounded-lg border border-border bg-white p-4">
        <h2 className="text-sm font-semibold text-charcoal">{tr('segregationTips')}</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-secondary space-y-1">
          <li>{tr('tip1')}</li>
          <li>{tr('tip2')}</li>
          <li>{tr('tip3')}</li>
          <li>{tr('tip4')}</li>
          <li>{tr('tip5')}</li>
        </ul>
      </section>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-xs text-secondary">{label}</p>
      <p className="mt-1 text-xl font-semibold text-charcoal truncate">
        {value}
      </p>
    </div>
  );
}