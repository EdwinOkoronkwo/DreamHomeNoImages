/* Task 1-1 ***************************************************************** */

SELECT
    *
FROM
    DH_STAFF;

-- Procedure:

CREATE OR REPLACE PROCEDURE STAFF_HIRE_SP (
    P_STAFFNO IN DH_STAFF.STAFFNO%TYPE,
    P_FNAME IN DH_STAFF.FNAME%TYPE,
    P_LNAME IN DH_STAFF.LNAME%TYPE,
    P_POSITION IN DH_STAFF.POSITION%TYPE,
    P_SEX IN DH_STAFF.SEX%TYPE,
    P_DOB IN DH_STAFF.DOB%TYPE,
    P_SALARY IN DH_STAFF.SALARY%TYPE,
    P_BRANCHNO IN DH_STAFF.BRANCHNO%TYPE,
    P_TELEPHONE IN DH_STAFF.TELEPHONE%TYPE,
    P_MOBILE IN DH_STAFF.MOBILE%TYPE,
    P_EMAIL IN DH_STAFF.EMAIL%TYPE,
    P_RESULT OUT VARCHAR2
) AS
    V_BRANCHCOUNT NUMBER(10);
    V_STAFFCOUNT  NUMBER(10);
BEGIN
 /*  Ensuring the branch number entered exists in the dh_branch table. 
        This guarantees that there is no Foreign Key constraint errors: */
    SELECT
        COUNT(*) INTO V_BRANCHCOUNT
    FROM
        DH_BRANCH
    WHERE
        BRANCHNO = P_BRANCHNO;
    IF V_BRANCHCOUNT != 0 THEN
 /*  Ensuring the staff number entered does not yet exist in the dh_staff 
            table. This guarantees that there is no Primary Key constraint 
            errors: */
        SELECT
            COUNT(*) INTO V_STAFFCOUNT
        FROM
            DH_STAFF
        WHERE
            STAFFNO = P_STAFFNO;
        IF V_STAFFCOUNT = 0 THEN
            INSERT INTO DH_STAFF (
                STAFFNO,
                FNAME,
                LNAME,
                POSITION,
                SEX,
                DOB,
                SALARY,
                BRANCHNO,
                TELEPHONE,
                MOBILE,
                EMAIL
            ) VALUES (
                P_STAFFNO,
                P_FNAME,
                P_LNAME,
                P_POSITION,
                P_SEX,
                P_DOB,
                P_SALARY,
                P_BRANCHNO,
                P_TELEPHONE,
                P_MOBILE,
                P_EMAIL
            );
            COMMIT;
            P_RESULT := 'Employee hired successfully.';
        ELSE
            P_RESULT := 'The staff number entered already exists.';
        END IF;
    ELSE
        P_RESULT := 'The branch number entered is not valid.';
    END IF;
END STAFF_HIRE_SP;
 

-- Procedure:
CREATE OR REPLACE PROCEDURE UPDATE_STAFF_SP ( P_STAFFNO IN DH_STAFF.STAFFNO%TYPE, P_NEW_SALARY IN DH_STAFF.SALARY%TYPE DEFAULT NULL, P_NEW_TELEPHONE IN DH_STAFF.TELEPHONE%TYPE DEFAULT NULL, P_NEW_MOBILE IN DH_STAFF.MOBILE%TYPE DEFAULT NULL, P_NEW_EMAIL IN DH_STAFF.EMAIL%TYPE DEFAULT NULL, P_RESULT OUT VARCHAR2 ) AS
    V_STAFFCOUNT NUMBER(10);
BEGIN
    SELECT
        COUNT(*) INTO V_STAFFCOUNT
    FROM
        DH_STAFF
    WHERE
        STAFFNO = P_STAFFNO;
    IF V_STAFFCOUNT != 0 THEN
        IF P_NEW_SALARY IS NOT NULL THEN
            UPDATE DH_STAFF
            SET
                SALARY = P_NEW_SALARY
            WHERE
                STAFFNO = P_STAFFNO;
        END IF;

        IF P_NEW_TELEPHONE IS NOT NULL THEN
            UPDATE DH_STAFF
            SET
                TELEPHONE = P_NEW_TELEPHONE
            WHERE
                STAFFNO = P_STAFFNO;
        END IF;

        IF P_NEW_MOBILE IS NOT NULL THEN
            UPDATE DH_STAFF
            SET
                MOBILE = P_NEW_MOBILE
            WHERE
                STAFFNO = P_STAFFNO;
        END IF;

        IF P_NEW_EMAIL IS NOT NULL THEN
            UPDATE DH_STAFF
            SET
                EMAIL = P_NEW_EMAIL
            WHERE
                STAFFNO = P_STAFFNO;
        END IF;

        COMMIT;
        P_RESULT := 'Information updated successfully';
    ELSE
        P_RESULT := 'The staff number entered does not exist';
    END IF;
END UPDATE_STAFF_SP;
 

-- Procedure:
CREATE OR REPLACE FUNCTION GET_BRANCH_ADDRESS_FN ( P_BRANCHNO IN DH_BRANCH.BRANCHNO%TYPE ) RETURN VARCHAR2 IS
    REC_BRANCH DH_BRANCH%ROWTYPE;
BEGIN
    SELECT
        * INTO REC_BRANCH
    FROM
        DH_BRANCH
    WHERE
        BRANCHNO = P_BRANCHNO;
    RETURN 'Street: '
           || REC_BRANCH.STREET
           || CHR(10)
           || 'City: '
           || REC_BRANCH.CITY
           || CHR(10)
           || 'Postal Code: '
           || REC_BRANCH.POSTCODE;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'The branch number entered does not exist.';
END GET_BRANCH_ADDRESS_FN;
 

-- Procedure:
CREATE OR REPLACE PROCEDURE UPDATE_BRANCH_DETAILS_SP ( P_BRANCHNO IN DH_BRANCH.BRANCHNO%TYPE, P_STREET IN DH_BRANCH.STREET%TYPE := NULL, P_CITY IN DH_BRANCH.CITY%TYPE := NULL, P_POSTCODE IN DH_BRANCH.POSTCODE%TYPE := NULL, P_RESULT OUT VARCHAR2 ) IS
    V_BRANCHCOUNT NUMBER(10);
BEGIN
    SELECT
        COUNT(*) INTO V_BRANCHCOUNT
    FROM
        DH_BRANCH
    WHERE
        BRANCHNO = P_BRANCHNO;
    IF V_BRANCHCOUNT != 0 THEN
        IF P_STREET IS NOT NULL THEN
            UPDATE DH_BRANCH
            SET
                STREET = P_STREET
            WHERE
                BRANCHNO = P_BRANCHNO;
        END IF;

        IF P_CITY IS NOT NULL THEN
            UPDATE DH_BRANCH
            SET
                CITY = P_CITY
            WHERE
                BRANCHNO = P_BRANCHNO;
        END IF;

        IF P_POSTCODE IS NOT NULL THEN
            UPDATE DH_BRANCH
            SET
                POSTCODE = P_POSTCODE
            WHERE
                BRANCHNO = P_BRANCHNO;
        END IF;

        COMMIT;
        P_RESULT := 'Information updated successfully!';
    ELSE
        P_RESULT := 'The branch number entered does not exist.';
    END IF;
END UPDATE_BRANCH_DETAILS_SP;
 

-- Procedure:
CREATE OR REPLACE PROCEDURE NEW_BRANCH_SP ( P_BRANCHNO IN DH_BRANCH.BRANCHNO%TYPE, P_STREET IN DH_BRANCH.STREET%TYPE, P_CITY IN DH_BRANCH.CITY%TYPE, P_POSTCODE IN DH_BRANCH.POSTCODE%TYPE DEFAULT NULL, P_RESULT OUT VARCHAR2 ) IS
    V_BRANCHCOUNT NUMBER(10);
BEGIN
    SELECT
        COUNT(*) INTO V_BRANCHCOUNT
    FROM
        DH_BRANCH
    WHERE
        BRANCHNO = P_BRANCHNO;
    IF V_BRANCHCOUNT = 0 THEN
        INSERT INTO DH_BRANCH (
            BRANCHNO,
            STREET,
            CITY,
            POSTCODE
        ) VALUES (
            P_BRANCHNO,
            P_STREET,
            P_CITY,
            P_POSTCODE
        );
        COMMIT;
        P_RESULT := 'New branch created successfully.';
    ELSE
        P_RESULT := 'The branch number entered already exists.';
    END IF;
END NEW_BRANCH_SP;
 

-- Procedure:
CREATE OR REPLACE PROCEDURE REGISTER_NEW_CLIENT_SP ( P_CLIENTNO IN DH_CLIENT.CLIENTNO%TYPE, P_FNAME IN DH_CLIENT.FNAME%TYPE, P_LNAME IN DH_CLIENT.LNAME%TYPE, P_TELNO IN DH_CLIENT.TELNO%TYPE := NULL, P_STREET IN DH_CLIENT.STREET%TYPE := NULL, P_CITY IN DH_CLIENT.CITY%TYPE := NULL, P_EMAIL IN DH_CLIENT.EMAIL%TYPE := NULL, P_PREFTYPE IN DH_CLIENT.PREFTYPE%TYPE := NULL, P_MAXRENT IN DH_CLIENT.MAXRENT%TYPE := NULL, P_RESULT OUT VARCHAR2 ) IS
    V_CLIENTCOUNT NUMBER(10);
BEGIN
    SELECT
        COUNT(*) INTO V_CLIENTCOUNT
    FROM
        DH_CLIENT
    WHERE
        CLIENTNO = P_CLIENTNO;
    IF V_CLIENTCOUNT = 0 THEN
        INSERT INTO DH_CLIENT (
            CLIENTNO,
            FNAME,
            LNAME,
            TELNO,
            STREET,
            CITY,
            EMAIL,
            PREFTYPE,
            MAXRENT
        ) VALUES (
            P_CLIENTNO,
            P_FNAME,
            P_LNAME,
            P_TELNO,
            P_STREET,
            P_CITY,
            P_EMAIL,
            P_PREFTYPE,
            P_MAXRENT
        );
        COMMIT;
        P_RESULT := 'New client registered successfully.';
    ELSE
        P_RESULT := 'The client number entered already exists.';
    END IF;
END REGISTER_NEW_CLIENT_SP;
 

-- Procedure:
CREATE OR REPLACE PROCEDURE UPDATE_CLIENT_SP ( P_CLIENTNO IN DH_CLIENT.CLIENTNO%TYPE, P_NEW_FNAME IN DH_CLIENT.FNAME%TYPE := NULL, P_NEW_LNAME IN DH_CLIENT.LNAME %TYPE := NULL, P_NEW_TELNO IN DH_CLIENT.TELNO%TYPE := NULL, P_NEW_STREET IN DH_CLIENT.STREET%TYPE := NULL, P_NEW_CITY IN DH_CLIENT.CITY%TYPE := NULL, P_NEW_EMAIL IN DH_CLIENT.EMAIL%TYPE := NULL, P_NEW_PREFTYPE IN DH_CLIENT.PREFTYPE%TYPE := NULL, P_NEW_MAXRENT IN DH_CLIENT.MAXRENT%TYPE := NULL, P_RESULT OUT VARCHAR2 ) IS
    V_CLIENTCOUNT NUMBER(10);
BEGIN
    SELECT
        COUNT(*) INTO V_CLIENTCOUNT
    FROM
        DH_CLIENT
    WHERE
        CLIENTNO = P_CLIENTNO;
    IF V_CLIENTCOUNT != 0 THEN
        IF P_NEW_FNAME IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                FNAME = P_NEW_FNAME
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_LNAME IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                LNAME = P_NEW_LNAME
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_TELNO IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                TELNO = P_NEW_TELNO
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_STREET IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                STREET = P_NEW_STREET
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_CITY IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                CITY = P_NEW_CITY
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_EMAIL IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                EMAIL = P_NEW_EMAIL
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_PREFTYPE IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                PREFTYPE = P_NEW_PREFTYPE
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        IF P_NEW_MAXRENT IS NOT NULL THEN
            UPDATE DH_CLIENT
            SET
                MAXRENT = P_NEW_MAXRENT
            WHERE
                CLIENTNO = P_CLIENTNO;
        END IF;

        COMMIT;
        P_RESULT := 'Client information updated successfully.';
    ELSE
        P_RESULT := 'The client number entered does not exist.';
    END IF;
END UPDATE_CLIENT_SP;