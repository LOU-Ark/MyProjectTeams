# Requirements Gathering Skill

This skill enables Claude to autonomously gather, analyze, and document requirements for features, projects, or issues.

## When to Use This Skill

Use this skill when:
- A user describes a feature but hasn't provided detailed requirements
- Converting vague ideas into structured specifications
- Analyzing an issue and determining what needs to be built
- Preparing for development planning
- Creating GitHub issues from conversations

## What This Skill Does

1. **Elicits Requirements Through Questions**
   - Asks clarifying questions about scope and goals
   - Identifies functional and non-functional requirements
   - Discovers constraints and dependencies
   - Clarifies success criteria

2. **Analyzes Context**
   - Reviews existing codebase patterns
   - Checks for similar implementations
   - Identifies affected components
   - Reviews related documentation

3. **Structures Requirements**
   - Organizes into functional/non-functional categories
   - Defines clear acceptance criteria
   - Prioritizes using MoSCoW method
   - Creates user stories where applicable

4. **Documents Findings**
   - Generates structured requirements document
   - Creates GitHub-compatible markdown
   - Includes technical specifications
   - Adds implementation considerations

## Usage Process

### Step 1: Initial Analysis

When a user describes a feature:
```
User: "I want to add user authentication"
```

Claude should:
1. Acknowledge the request
2. Start gathering context from the codebase
3. Begin asking clarifying questions

### Step 2: Ask Clarifying Questions

Essential questions to ask:
- What type of authentication? (OAuth, JWT, Session-based)
- Who are the users? (Internal staff, external customers, admins)
- What features need protection?
- Any specific security requirements?
- Integration with existing systems?
- Password policies required?
- MFA/2FA needed?
- Social login options?

### Step 3: Analyze Codebase

Search for:
- Existing authentication patterns
- Current user models
- API structure
- Frontend framework in use
- State management approach
- Database schema

### Step 4: Structure Requirements

Create document following this format:

```markdown
## Feature: User Authentication

### Business Context
- **Problem**: Users currently have no way to securely access the system
- **Goal**: Implement secure authentication for user access control
- **Success Criteria**: Users can register, login, and access protected resources

### Functional Requirements

#### FR-1: User Registration
**Priority**: Must-have
**Description**: Users can create new accounts with email and password
**Acceptance Criteria**:
- [ ] Registration form validates email format
- [ ] Password meets complexity requirements (min 8 chars, 1 uppercase, 1 number)
- [ ] Email confirmation sent upon registration
- [ ] Duplicate emails are rejected
- [ ] User data is stored securely in database

#### FR-2: User Login
**Priority**: Must-have
**Description**: Registered users can authenticate and access the system
**Acceptance Criteria**:
- [ ] Login form accepts email and password
- [ ] Invalid credentials show appropriate error message
- [ ] Successful login creates session/JWT token
- [ ] User is redirected to dashboard after login
- [ ] Remember me option available

#### FR-3: Password Reset
**Priority**: Should-have
**Description**: Users can reset forgotten passwords
**Acceptance Criteria**:
- [ ] Forgot password link on login page
- [ ] Email with reset link sent to user
- [ ] Reset link expires after 1 hour
- [ ] User can set new password
- [ ] Old password is invalidated

### Non-Functional Requirements

#### NFR-1: Security
- Passwords hashed using bcrypt (10+ rounds)
- JWT tokens expire after 24 hours
- Refresh tokens for extended sessions
- HTTPS required for all auth endpoints
- Protection against brute force attacks (rate limiting)
- CSRF protection implemented

#### NFR-2: Performance
- Login response time < 500ms
- Registration process < 1 second
- Token validation < 100ms

#### NFR-3: Accessibility
- Forms are keyboard navigable
- Screen reader compatible
- Error messages clearly announced
- WCAG 2.1 AA compliance

### User Stories

**US-1**: As a new user, I want to register for an account, so that I can access the platform
**US-2**: As a registered user, I want to login securely, so that I can access my data
**US-3**: As a user, I want to reset my password if I forget it, so that I can regain access

### Technical Specifications

#### Backend
- Framework: [Express/Fastify/NestJS]
- Authentication: JWT with refresh tokens
- Password hashing: bcrypt
- Rate limiting: express-rate-limit
- Validation: Zod/Joi

**API Endpoints**:
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/refresh - Refresh JWT token
POST /api/auth/logout - User logout
POST /api/auth/forgot-password - Request password reset
POST /api/auth/reset-password - Reset password with token
GET /api/auth/me - Get current user
```

#### Frontend
- Framework: [React/Vue/Next.js]
- State management: [Context/Zustand/Redux]
- Form handling: React Hook Form
- API client: Axios/Fetch

**Components**:
- RegisterForm
- LoginForm
- ForgotPasswordForm
- ResetPasswordForm
- AuthProvider (context)

#### Database
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Dependencies
- bcrypt library for password hashing
- jsonwebtoken for JWT handling
- nodemailer for email sending
- express-validator for input validation

### Assumptions
- Email service is already configured
- HTTPS is available in production
- Database supports UUIDs

### Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Email delivery issues | High | Use reliable email service (SendGrid/AWS SES) |
| Token security | High | Use secure random tokens, HTTPS only |
| Database performance | Medium | Index email column, use connection pooling |

### Testing Requirements
- Unit tests for auth service methods
- Integration tests for API endpoints
- E2E tests for registration and login flows
- Security testing (SQL injection, XSS, CSRF)
- Load testing for concurrent logins

### Implementation Estimate
- Backend: 3-5 days
- Frontend: 2-3 days
- Testing: 2 days
- Total: 7-10 days
```

### Step 5: Save and Share

Save the document to appropriate location:
```bash
mkdir -p docs/requirements
cat > docs/requirements/user-authentication.md <<EOF
[Requirements content]
EOF
```

Optionally create GitHub issue:
```bash
gh issue create \
  --title "Requirements: User Authentication" \
  --body "$(cat docs/requirements/user-authentication.md)" \
  --label "requirements,documentation"
```

## Best Practices

### Question Asking
- Start with open-ended questions
- Follow up with specific clarifications
- Don't assume - ask when uncertain
- Validate understanding by summarizing

### Requirement Quality
- Make requirements specific and measurable
- Include clear acceptance criteria
- Use consistent terminology
- Avoid technical jargon in business requirements

### Prioritization
- Use MoSCoW (Must, Should, Could, Won't)
- Distinguish MVP from future enhancements
- Consider dependencies when prioritizing

### Documentation
- Use consistent formatting
- Include code examples where helpful
- Link to related documentation
- Keep language clear and concise

## Integration with Other Tools

This skill works well with:
- `/sng-requirements` command (for manual invocation)
- `requirements-analyst` agent (for deep analysis)
- `development-planner` agent (for next step)
- GitHub issue creation workflows

## Example Scenarios

**Scenario 1: Vague Feature Request**
```
User: "We need better search"
Claude: [Activates requirements-gathering skill]
- What should be searchable? (users, products, documents)
- What search features are needed? (filters, autocomplete)
- Performance requirements? (results per second)
- Analyzes current search implementation
- Documents comprehensive requirements
```

**Scenario 2: Bug Report Needs Clarification**
```
User: "Search is broken"
Claude: [Activates requirements-gathering skill]
- What specific search functionality is broken?
- What is the expected vs actual behavior?
- Steps to reproduce?
- Creates detailed bug report with acceptance criteria for fix
```

**Scenario 3: New Feature from Stakeholder**
```
User: "CEO wants a dashboard"
Claude: [Activates requirements-gathering skill]
- What data should be displayed?
- Who will use this dashboard?
- Real-time or static data?
- Mobile support needed?
- Creates comprehensive requirements with user stories
```

## Output Format

Always provide:
1. **Requirements Summary**: Executive overview (2-3 sentences)
2. **Structured Document**: Complete requirements in markdown
3. **Next Steps**: Suggested actions (create issue, start planning, etc.)
4. **Open Questions**: Any items that still need clarification
5. **File Location**: Where requirements were saved

## Tips

- Don't be afraid to ask "dumb" questions - better to clarify than assume
- Look for existing patterns in the codebase to maintain consistency
- Consider the full user journey, not just the happy path
- Think about error cases and edge conditions
- Include non-functional requirements (performance, security, accessibility)
- Estimate implementation effort to help with planning
