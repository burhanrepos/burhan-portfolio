export interface Chapter {
  title: string;
  subtitle: string;
  takeaway: string;
  codeSnippet?: string;
  codeLanguage?: string;
  content: string[];
  checklist: string[];
}

export interface HandbookDetails {
  id: string;
  title: string;
  description: string;
  tech: string;
  coverColor: string;
  githubUrl: string;
  chaptersCount: number;
  chapters: Chapter[];
}

export const HANDBOOK_DETAILS: HandbookDetails[] = [
  {
    id: "angular-handbook",
    title: "Angular Architecture Handbook",
    tech: "Angular, RxJS, NgRx, TypeScript",
    description: "An advanced, production-oriented guide covering NgRx facade patterns, customized RxJS state caching, lazy-loading routes, and unit testing strategies.",
    coverColor: "from-red-600 to-rose-800",
    githubUrl: "https://burhanrepos.github.io/angular-handbook/",
    chaptersCount: 3,
    chapters: [
      {
        title: "1. The Facade Pattern in NgRx State Management",
        subtitle: "Separating components from store structures for ultimate testability",
        takeaway: "Injecting stores directly into components breeds regression. Use state facades as a unified API layer.",
        codeLanguage: "typescript",
        codeSnippet: `@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store);

  // Expose slice streams as clean properties
  readonly activeUser$ = this.store.select(selectActiveUser);
  readonly isLoading$ = this.store.select(selectUserLoadingState);

  // Single point of entry for user mutations
  loadUser(userId: string) {
    this.store.dispatch(UserActions.loadUser({ userId }));
  }

  updateProfile(profile: UserProfile) {
    this.store.dispatch(UserActions.updateProfile({ profile }));
  }
}`,
        content: [
          "Directly injecting the NgRx Store into multiple presentation components leads to tightly coupled UI code. If the selector structure or action payloads change, refactoring dozens of files becomes a nightmare.",
          "By implementing a Facade Service, we introduce an abstraction layer. Components interact solely with public streams and methods, completely oblivious to NgRx's internal architecture.",
          "This architecture allows for painless transitions to other state solutions (like Signals, Akita, or plain RxJS Services) without modifying any component templates."
        ],
        checklist: [
          "Declare all selectors as private/internal to the facade",
          "Ensure actions are never dispatched directly in components",
          "Expose state properties as read-only streams or Signals",
          "Mock facades easily during isolated component spec unit tests"
        ]
      },
      {
        title: "2. Custom Reactive Caching with RxJS Pipes",
        subtitle: "Implementing shareReplay and manual invalidation strategies",
        takeaway: "Prevent repetitive API queries under heavy navigation with declarative stream cache controllers.",
        codeLanguage: "typescript",
        codeSnippet: `private readonly cacheRefresh$ = new BehaviorSubject<void>(undefined);

readonly productsState$ = this.cacheRefresh$.pipe(
  switchMap(() => this.http.get<Product[]>('/api/products')),
  shareReplay({ bufferSize: 1, refCount: false })
);

// Method to forcefully bust cache
invalidateAndRefresh() {
  this.cacheRefresh$.next();
}`,
        content: [
          "RxJS shareReplay is extremely powerful, but using it with refCount: true can cause unwanted cache destruction if all subscribers briefly disconnect during route animations.",
          "Setting refCount to false retains the cached payload indefinitely, meaning we need a deterministic trigger (like a BehaviorSubject) to reload or invalidate the stream.",
          "This design guarantees immediate storefront paints on back navigation while preserving a simple, imperative reload path for user interaction."
        ],
        checklist: [
          "Set bufferSize to 1 to hold only the most recent payload",
          "Set refCount to false for absolute long-lived client cache state",
          "Pipe switchMap over a trigger subject to cleanly restart hot requests",
          "Dispose cache gracefully during ngOnDestroy lifecycle steps"
        ]
      },
      {
        title: "3. Lazy-Loading Route Strategies & Chunk Preloading",
        subtitle: "Optimizing bundle sizes and Initial Input Delay for modern Web Vitals",
        takeaway: "Do not wait for clicks. Build proactive custom preloading rules to balance bundle loads.",
        codeLanguage: "typescript",
        codeSnippet: `export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const shouldPreload = route.data && route.data['preload'];
    
    return shouldPreload 
      ? timer(2000).pipe(switchMap(() => load())) // Delay load to clear first paint
      : of(null);
  }
}`,
        content: [
          "Angular defaults to loading chunks on-demand or preloading all chunks eagerly. In heavy enterprise apps, loading everything instantly spikes CPU overhead, hurting user interaction scores.",
          "A selective preloading strategy delays secondary bundles by a few seconds after the application boots. This secures top-tier performance scores on landing pages.",
          "Configure route definitions with explicit data parameters to programmatically categorize module priority levels."
        ],
        checklist: [
          "Avoid using Eagerly Imported Modules in routing configurations",
          "Establish custom delayed timers for low-priority modules",
          "Validate final bundle sizes with source-map-explorer tools"
        ]
      }
    ]
  },
  {
    id: "nextjs-handbook",
    title: "Next.js Deep-Dive Blueprint",
    tech: "React, Next.js, Next Auth, Server Actions",
    description: "A complete framework reference dissecting App Router behaviors, server-side caching mechanics, middleware filters, and SEO optimization metrics.",
    coverColor: "from-zinc-800 to-black",
    githubUrl: "https://burhanrepos.github.io/nextjs-handbook/",
    chaptersCount: 3,
    chapters: [
      {
        title: "1. Streaming & Dynamic Suspense Boundaries",
        subtitle: "Taming slow API integrations through intelligent UI skeleton streams",
        takeaway: "Never block page renders for secondary data widgets. Push layout skeletons immediately.",
        codeLanguage: "javascript",
        codeSnippet: `// app/storefront/page.tsx
export default function StorefrontPage() {
  return (
    <div className="space-y-6">
      <HeroBanner />
      
      {/* Dynamic secondary block is streamed concurrently */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <SlowRecommendedProducts />
      </Suspense>
    </div>
  );
}`,
        content: [
          "Under the App Router, slow backend fetch operations inside Server Components block the initial HTML response. This forces users to stare at blank pages.",
          "By encapsulating expensive data components inside React Suspense boundaries, Next.js streams the fast parts of the page immediately, filling in slow areas over a single persistent TCP connection.",
          "This paradigm shifts focus towards progressive enhancement, boosting First Contentful Paint (FCP) scores."
        ],
        checklist: [
          "Identify API requests taking longer than 150ms",
          "Extract those calls into dedicated Async Server Components",
          "Wrap components in React Suspense blocks with light, custom skeletons"
        ]
      },
      {
        title: "2. Next-Auth Cookie Security & Token Rotation",
        subtitle: "Keeping sessions alive with high-security HttpOnly JWT structures",
        takeaway: "Standard cookies expire. Implement automated silent token refreshes during server runtime requests.",
        codeLanguage: "javascript",
        codeSnippet: `async function refreshAccessToken(token) {
  try {
    const res = await fetch("https://api.gateway.com/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken: token.refreshToken })
    });
    const data = await res.json();
    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + data.expiresIn * 1000
    };
  } catch (err) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}`,
        content: [
          "Authentication flows on the web require durable, secure cookie validation. Storing active JWTs in localStorage exposes credentials to cross-site scripting (XSS) attacks.",
          "Using Next-Auth with encrypted, server-side HttpOnly cookies prevents browser script inspection.",
          "Incorporate a silent JWT Token Rotation protocol within the session callback mechanism. When the token approaches expiry, the server issues a silent, secure request to the main API gateway."
        ],
        checklist: [
          "Always apply the 'secure' and 'httpOnly' flags to session cookies",
          "Add token-expiry validation flags to Next-Auth middleware filters",
          "Handle RefreshAccessTokenError by gracefully redirecting to login"
        ]
      },
      {
        title: "3. Server Actions Validation & Optimistic Updates",
        subtitle: "Form mutations with instant UI rendering feedback",
        takeaway: "No more spinner delays. Render changes locally before the server finishes committing records.",
        codeLanguage: "javascript",
        codeSnippet: `// Client Component
const [optimisticCart, setOptimisticCart] = useOptimistic(
  cart,
  (state, newProduct) => [...state, newProduct]
);

async function handleAdd() {
  startTransition(() => {
    setOptimisticCart({ id: 'temp-id', name: 'Premium Item' });
  });
  await addToCartAction(product.id);
}`,
        content: [
          "Server Actions are fantastic for form submission, but waiting for network Round Trip Times (RTT) before updating the user interface can feel sluggish.",
          "Using React's useOptimistic hook lets you simulate a successful update instantly on the client screen.",
          "If the Server Action succeeds, the official state takes over. If the server-side operation fails, React automatically reverts the UI state, displaying a contextual error toast."
        ],
        checklist: [
          "Ensure schema inputs are sanitized via Zod inside the Server Action",
          "Wrap state mutations within startTransition blocks",
          "Provide resilient rollback feedback to prevent UI/DB mismatches"
        ]
      }
    ]
  },
  {
    id: "nodejs-handbook",
    title: "Node.js & Express API Guide",
    tech: "Node.js, Express, SQL, GraphQL, JWT",
    description: "A step-by-step masterclass in constructing highly modular RESTful and GraphQL backend endpoints, robust JWT authentication layers, and PostgreSQL schema definitions.",
    coverColor: "from-emerald-600 to-teal-800",
    githubUrl: "https://burhanrepos.github.io/node-visual-handbook/",
    chaptersCount: 3,
    chapters: [
      {
        title: "1. Centralized Async Error Middleware",
        subtitle: "A unified safety net preventing uncaught express promise crashes",
        takeaway: "Never write repetitive try-catch blocks. Write clean async handler wrappers.",
        codeLanguage: "javascript",
        codeSnippet: `// Controller Wrapper Utility
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Database Exception'
  });
});`,
        content: [
          "By default, unhandled rejections inside Express async route handlers can leak sensitive database logs, block node execution threads, or crash container runtimes.",
          "Implementing a simple higher-order function (catchAsync) automatically forwards rejected promises to the central error middleware.",
          "This maintains beautiful, highly scannable controller logic while ensuring unified response signatures for all API clients."
        ],
        checklist: [
          "Avoid naked try-catch structures inside route-level controllers",
          "Construct a custom AppError class inheriting from base Error",
          "Strip production exception stack traces before returning responses"
        ]
      },
      {
        title: "2. Batching Database Queries in GraphQL",
        subtitle: "Preventing the critical N+1 query problem with DataLoader utility layers",
        takeaway: "Avoid cascading database fetches. Batch array requests into single indexed operations.",
        codeLanguage: "javascript",
        codeSnippet: `const authorLoader = new DataLoader(async (authorIds) => {
  const authors = await db.query(
    'SELECT * FROM authors WHERE id = ANY($1)', [authorIds]
  );
  
  // Map back to guarantee input array index symmetry
  return authorIds.map(id => authors.find(a => a.id === id));
});

// Resolver implementation
const resolvers = {
  Book: {
    author: (book) => authorLoader.load(book.authorId)
  }
};`,
        content: [
          "In nested GraphQL query resolutions, the runtime executes individual queries for every nested item returned by a parent resolver.",
          "If a client requests 50 books, a naive server triggers 1 initial query for books, plus 5 subsequent database queries to fetch authors. This is the N+1 problem.",
          "DataLoader aggregates and batches keys collected within a single event loop tick, converting 5 queries into a single database search utilizing PG arrays."
        ],
        checklist: [
          "Verify SQL call counts under deep query testing profiles",
          "Ensure keys returned by DataLoader match input array lengths precisely",
          "Configure caching behaviors to prevent duplicate queries within a single request"
        ]
      },
      {
        title: "3. PostgreSQL Escrow Transaction Controls",
        subtitle: "Securing atomic, lock-safe balance manipulations",
        takeaway: "When manipulating money or status, wrap queries in absolute transaction blocks with strict rollback protocols.",
        codeLanguage: "javascript",
        codeSnippet: `const client = await pool.connect();
try {
  await client.query('BEGIN');
  
  // Read and hold lock on target balance
  const result = await client.query(
    'SELECT balance FROM escrow WHERE id = $1 FOR UPDATE', [escrowId]
  );
  
  // Perform mutation check
  const newBalance = result.rows[0].balance - amount;
  if (newBalance < 0) throw new Error('Insufficient Funds');
  
  await client.query('UPDATE escrow SET balance = $1 WHERE id = $2', [newBalance, escrowId]);
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();
}`,
        content: [
          "Parallel worker scripts in multi-user applications can execute read-update steps simultaneously. This can lead to race conditions where balances can turn negative.",
          "Utilizing SQL transactions (BEGIN/COMMIT) combined with the 'FOR UPDATE' row locking clause forces concurrent processes to queue up, ensuring data consistency.",
          "A robust try-catch-finally block ensures that db connections are safely returned to the pool, preventing memory leaks and database connection exhaustion."
        ],
        checklist: [
          "Always call client.release() in a finally block to prevent connection leaks",
          "Use the SELECT ... FOR UPDATE statement to locks records under write scenarios",
          "Verify balance conditions server-side, never trusting client computations"
        ]
      }
    ]
  },
  {
    id: "database-design-handbook",
    title: "Database Design Handbook",
    tech: "SQL, PostgreSQL, Data Modeling, Indexing",
    description: "A practical handbook covering normalization, indexing, query planning, and scalable schema strategies for modern applications.",
    coverColor: "from-sky-700 to-cyan-900",
    githubUrl: "https://burhanrepos.github.io/database-design-handbook/",
    chaptersCount: 3,
    chapters: [
      {
        title: "1. Modeling Reality Without Redundancy",
        subtitle: "Designing normalized entities and relationships",
        takeaway: "Good schemas mirror business rules and reduce update anomalies.",
        codeLanguage: "sql",
        codeSnippet: `CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
        content: [
          "Database design starts by separating concerns between entities, their attributes, and the relationships that connect them.",
          "Normalization reduces duplication, making data easier to maintain and less susceptible to conflicting updates.",
          "A scalable schema still leaves room for future growth through careful constraints and clear ownership boundaries."
        ],
        checklist: [
          "Identify entities before adding columns",
          "Use foreign keys to preserve relationship integrity",
          "Avoid storing derived values in base tables"
        ]
      },
      {
        title: "2. Indexing for Read Performance",
        subtitle: "Choosing the right indexes for selective workloads",
        takeaway: "Indexing should be purposeful; too many indexes can slow writes and bloat storage.",
        codeLanguage: "sql",
        codeSnippet: `CREATE INDEX idx_orders_customer_id
ON orders (customer_id);

CREATE INDEX idx_orders_created_at
ON orders (created_at DESC);`,
        content: [
          "Indexes accelerate read-heavy lookups, but they add overhead to inserts, updates, and deletes.",
          "The best indexing strategy depends on query patterns, selectivity, and the balance between read speed and write cost.",
          "Composite indexes are especially effective when filters and sorts share a predictable column order."
        ],
        checklist: [
          "Review slow query plans before adding indexes",
          "Prefer composite indexes for multi-column filters",
          "Monitor write amplification after index changes"
        ]
      },
      {
        title: "3. Transactions and Concurrency",
        subtitle: "Keeping data safe during parallel writes",
        takeaway: "Transactions preserve consistency when multiple users modify the same records at once.",
        codeLanguage: "sql",
        codeSnippet: `BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 42;

UPDATE accounts
SET balance = balance + 100
WHERE id = 99;

COMMIT;`,
        content: [
          "Transactions bundle multiple statements into one atomic unit so failures cannot leave the system half-updated.",
          "Concurrency control ensures that competing writers do not silently overwrite each other's changes.",
          "Proper isolation levels and row locking protect critical workflows such as payments and inventory updates."
        ],
        checklist: [
          "Wrap related mutations inside a transaction",
          "Use the right isolation level for the workload",
          "Test rollback paths under contention"
        ]
      }
    ]
  },
  {
    id: "react-deep-dive-handbook",
    title: "React Deep Dive Handbook",
    tech: "React, Hooks, Performance, State",
    description: "A deep dive into component composition, rendering performance, hooks, and state management patterns in modern React.",
    coverColor: "from-indigo-700 to-violet-900",
    githubUrl: "https://burhanrepos.github.io/react-deep-dive-handbook/",
    chaptersCount: 3,
    chapters: [
      {
        title: "1. Composition Over Deep Prop Trees",
        subtitle: "Building resilient UI boundaries with small, purposeful components",
        takeaway: "Composable components reduce complexity and make feature changes much safer.",
        codeLanguage: "typescript",
        codeSnippet: `function Dashboard({ user }) {
  return (
    <Panel>
      <ProfileHeader user={user} />
      <ActivityFeed userId={user.id} />
    </Panel>
  );
}`,
        content: [
          "React applications become easier to maintain when data flows through explicit boundaries instead of deep prop drilling.",
          "Small components establish clear responsibilities and can be reused across multiple screens without accidental coupling.",
          "Layered composition also makes it simpler to reason about updates, tests, and future refactors."
        ],
        checklist: [
          "Split large screens into focused components",
          "Keep props minimal and domain-specific",
          "Prefer composition over inheritance-like patterns"
        ]
      },
      {
        title: "2. Understanding Re-render Costs",
        subtitle: "Using memoization and stable references with care",
        takeaway: "Avoid premature optimization, but measure slow renders when the UI becomes noisy.",
        codeLanguage: "typescript",
        codeSnippet: `const Child = memo(function Child({ value }) {
  return <div>{value}</div>;
});

const parentValue = useMemo(() => ({ count }), [count]);`,
        content: [
          "Re-rendering is not always a problem, but unnecessary renders can become expensive in large component trees.",
          "Memoization helps when referential stability matters, especially with expensive children or heavy lists.",
          "The best results come from measuring real bottlenecks rather than applying memoization everywhere by default."
        ],
        checklist: [
          "Profile renders before introducing memoization",
          "Use memo only where identity changes matter",
          "Keep dependencies tight and predictable"
        ]
      },
      {
        title: "3. Hooks and Side-Effect Discipline",
        subtitle: "Keeping effects predictable and reusable",
        takeaway: "Hooks shine when side effects are organized around clear lifecycle boundaries.",
        codeLanguage: "typescript",
        codeSnippet: `function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`,
        content: [
          "Hooks encourage reusable logic, but effects should still be kept predictable and scoped to a single concern.",
          "Cleanup functions and dependency arrays are the difference between a robust hook and a subtle state leak.",
          "Separation of concerns becomes much easier when hooks encapsulate one bit of behavior at a time."
        ],
        checklist: [
          "Keep effects focused on one responsibility",
          "Return cleanup logic for listeners and subscriptions",
          "Treat dependency arrays as a correctness contract"
        ]
      }
    ]
  }
];
